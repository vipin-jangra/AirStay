import dotenv from "dotenv";

dotenv.config();
import mongoose from 'mongoose';
import app from './app';

const MONGO = process.env.MONGO_URL || 'mongodb://localhost:27017/airstay';
const PORT = Number(process.env.PORT || 4000);

async function start() {
  await mongoose.connect(MONGO);
  console.log('Mongo connected');
  app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
}

start().catch(err => {
  console.error('Failed to start', err);
  process.exit(1);
});
