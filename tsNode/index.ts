import express, { Express, Response, Request } from 'express';
import { calculateBmi } from './service/bmiCalculator';

const app: Express = express();

app.get('/hello', (_req: Request, res: Response): void => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req: Request, res: Response): void => {
    try {
        const response = calculateBmi(parseFloat(<string>req.query.height), parseFloat(<string>req.query.weight));
        res.send(response);
    } catch (err) {
        res.status(400).json({ error: 'Malformed parameters', err});
    }
});

const PORT: number = 3003;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
