import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import notFound from './app/middlewares/notFound';
import globalErrorHandler from './app/middlewares/globalErrorHandler';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// application routes

const getAController = (req: Request, res: Response) => {
  res.send('Hello, Pharma TypeScript (^_^)');
};
app.get('/api', getAController);
app.use(notFound);
app.use(globalErrorHandler);

export default app;
