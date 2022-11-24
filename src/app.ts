import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mainRouter from './routes';

const app = express();

const allowedOrigins = [
    'http://localhost:3000',
    'https://golden-seahorse-94ed53.netlify.app',
    'https://productmanagement.vercel.app'
];

const corsOptions = {
    origin: allowedOrigins,
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}

app.use(cors(corsOptions));

app.use(bodyParser.json())

app.use('/', mainRouter)


export default app;