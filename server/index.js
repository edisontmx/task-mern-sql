import express from 'express';
import cors from 'cors';
import {dirname, join} from 'path';
import {fileURLToPath} from 'url';
import { PORT, FRONT_URL } from './config.js';
import indexRoutes from './routes/index.routes.js';
import taskRoutes from './routes/tasks.routes.js';
import { pool } from './db.js';

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
console.log(__dirname);

async function connect() {
    try {
        await pool.getConnection();
        console.log("DB connected");
    } catch (error) {
        console.log(error);
    }
}

connect();

app.use(cors({
    origin: FRONT_URL,
}));
app.use(express.json());

app.use(indexRoutes);
app.use(taskRoutes);

app.use(express.static(join(__dirname, '../client/dist')));

app.listen(PORT)
/* console.log("server is running on port ", PORT) */
console.log(`Server on port ${PORT}`)