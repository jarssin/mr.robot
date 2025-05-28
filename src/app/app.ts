import express from 'express';

import { SqliteDB } from '../providers/database';
import { WhatsappProvider } from '../providers/whatsapp';

import logger from '../utils/logger';

import { entryPoint } from './routes';

export class Application {
  async initialize() {
    const app = express();
    const port = process.env.PORT ?? 3000;
    // initialize whatsapp client
    const client = await new WhatsappProvider().connect();
    // await eventHandler(client)
    // await saveAllContacts(client)

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(entryPoint(client));

    app.listen(port, () => {
      logger.success(`Server running on: http://localhost:${port}`);
    });
  }
}

(async () => {
  const db = new SqliteDB().connection;
  logger.success(`Connected to the database`);
  db.close();
  // wait in case of first run
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const app = new Application();
  await app.initialize();
})();
