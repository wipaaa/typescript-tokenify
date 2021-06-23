import cors from './cors.config';
import express, { Application } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from '../constants';

const app: Application = express();

app.set('host', env.host);
app.set('port', env.port);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan('combined'));

export default app;
