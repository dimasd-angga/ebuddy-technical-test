import express, { Request, Response } from 'express';
import cors from 'cors';
import userRoutes from '../routes/userRoutes';
import dotenv from 'dotenv';
import { errorHandler } from '../controller/api';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/user', userRoutes);

app.get('/', (req: Request, res: Response) => {
    res.json({ status: 'Server is running' });
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});