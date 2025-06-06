import { initMongoDB } from './src/db/initMongoConnection.js';
import { setupServer } from './src/server';


const bootstrap = async () => {
  await initMongoDB();
  setupServer();
};

bootstrap();