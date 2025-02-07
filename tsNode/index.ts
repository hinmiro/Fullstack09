import express, { Express, Response, Request } from 'express';
import { calculateBmi } from './service/bmiCalculator';
import { calculateExercises } from './service/exerciseCalculator';

const app: Express = express();
app.use(express.json());

app.get('/hello', (_req: Request, res: Response): void => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req: Request, res: Response): void => {
    try {
        const response = calculateBmi(parseFloat(<string>req.query.height), parseFloat(<string>req.query.weight));
        res.send(response);
    } catch {
        res.status(400).json({ error: 'Malformed parameters' });
    }
});

const PORT: number = 3003;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

app.post('/exercises', (req: Request, res: Response): void => {
    try {
        const { daily_exercises, target } = req.body as { daily_exercises: Array<number>, target: number };

        if (!daily_exercises || !target) {
            res.status(400).json({ error: 'Parameters missing' });
        }

        if (!Array.isArray(daily_exercises)) {
            res.status(400).json({ error: 'Malformatted parameters' });
        }

        for (const e of daily_exercises) {
            if (isNaN(e)) {
                res.status(400).json({ error: 'Malformatted parameters' });
            }
        }

        if (isNaN(target)) {
            res.status(400).json({ error: 'Malformed parameters' });
        }

        const response = calculateExercises(daily_exercises, target);
        console.log(response);
        if ('error' in response) {
            res.status(400).json({ error: 'Malformed parameters' });
        }

        res.send(response);
    } catch {
        res.status(500).json({ error: 'Bad server... Bad!' });
    }
});
