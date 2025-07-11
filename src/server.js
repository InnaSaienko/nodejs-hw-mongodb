import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { getEnvVar } from './utils/getEnvVar.js';
import { errorHandler } from './middlewares/errorHandler.js';
import router from './routers/routerGlobal.js';
import cookieParser from "cookie-parser";
import { ENV_VARS } from './constants/envVar.js';
import { PERMANENT_UPLOAD_DIR } from './constants/path.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';

const PORT = Number(getEnvVar(ENV_VARS.PORT, 3000));

export function setupServer() {
  const app = express();

  app.use(express.json({
    type: ['application/json', 'application/vnd.api+json'],
    limit: '100kb',
  }));
  app.use('/uploads', express.static(PERMANENT_UPLOAD_DIR));
  app.use('/api-docs', swaggerDocs());
  app.use(cors());
  app.use(cookieParser());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/', (req, res) => {
    res.status(200).json({
      message: 'Server is running',
    });
  });

  app.use(router);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}