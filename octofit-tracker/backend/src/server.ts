import express from 'express';
import { connectToDatabase } from './config/database';

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'octofit-backend' });
});

connectToDatabase();

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});
