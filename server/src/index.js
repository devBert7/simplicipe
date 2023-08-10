import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import {userRouter} from "./routes/users.router.js";

const DB_PORT = 27017;
const SERVER_PORT = 3001;
const myDb = 'my_database';
const connectionString = `mongodb://localhost:${DB_PORT}/${myDb}`;
const app = express();

app.use(express.json());
app.use(cors());

app.use('/auth', userRouter);

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch(err => {
    console.log(err);
});

app.listen(SERVER_PORT, () => console.log(`listening on port ${SERVER_PORT} and connected to ${myDb}`));