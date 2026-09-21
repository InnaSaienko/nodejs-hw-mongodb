import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { getEnvVar } from './utils/getEnvVar.js';
import { errorHandler } from './middlewares/errorHandler.js';
import router from "./routers/routerGlobal.js";
import cookieParser from "cookie-parser";

const PORT = Number(getEnvVar('PORT', 5173));

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors({
    origin: 'http://localhost:3000', // your frontend origin
    credentials: true,
  }));
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
};