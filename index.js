import { initMongoDB } from './src/db/initMongoConnection';
import { setupServer } from './src/server';


const bootstrap = async () => {
  await initMongoDB();
  setupServer();
};

bootstrap();