import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import router from './routes/index.js';

const app = express();
app.use(cors({ origin: (_o, cb)=>cb(null,true), credentials:true }));
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.get('/health', (_req,res)=>res.json({ok:true}));
app.use('/api', router);


export default app;
