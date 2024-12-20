import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Router } from 'express';
import express from 'express';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = Router();

// TODO: Define route to serve index.html DONE

const app = express();

app.get('/', (_req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

/*
  const PORT = 3010;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  
    });
*/
export default router;
