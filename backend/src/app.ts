import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import listingsRouter from './routes/listings.routes';
import { errorHandler } from './middleware/errorHandler';

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(morgan('dev'));

app.use('/api/v1/listings', listingsRouter);

app.get('/health', (_, res) => res.json({ ok: true }));

app.use(errorHandler);

export default app;
