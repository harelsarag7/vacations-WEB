import express, { json } from 'express';
import { catchAll } from './3-middleware/error-handle';
import { logRequest } from './3-middleware/log';
import { authRouter } from './6-controllers/auth-controller';
// import { cardsRouter } from './6-controllers/cards-controller';
import cors from "cors" 
import fileUpload from 'express-fileupload';
import * as dotenv from 'dotenv'
import { vacationsRouter } from './6-controllers/vacations-controller';
dotenv.config({ path: process.env.NODE_ENV === "dev" ? ".env" : ".env.prod" });


const server = express();
server.use(cors())
server.use(json());
server.use(fileUpload())
server.use(logRequest);

server.use('/api', vacationsRouter);
server.use('/api', authRouter);

server.use(catchAll);

server.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}...`);
});