import express from 'express';
import { calculateBMI } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    res.json({ error: 'malformatted parameters' });
  }

  const bmi = calculateBMI(height, weight);
  res.json({ weight, height, bmi });
}
);

app.post ('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  if (!daily_exercises || !target) {
    res.json({ error: 'parameters missing' });
  }
  if (!Array.isArray(daily_exercises) || isNaN(Number(target)) || daily_exercises.some(day => isNaN(Number(day)))) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  const dailyHours = daily_exercises.map(Number);
  const targetNumber = Number(target);
  const result = calculateExercises(dailyHours, targetNumber);
  return res.json(result);

}
);


const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});