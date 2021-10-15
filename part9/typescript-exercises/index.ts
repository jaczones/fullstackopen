/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (_req, res) => {
  console.log(_req.query);
  if (!isNaN(Number(_req.query.Height)) && !isNaN(Number(_req.query.weight))) {
    res.send({
      'height': _req.query.Height,
      'weight': _req.query.weight,
      'bmi': calculateBmi(Number(_req.query.Height),Number(_req.query.weight))
  });
} else {
  res.send({
    'error': "malformatted parameters"
  });
}});

app.post('/exercises',(_req, res) => {
  if (!isNaN(Number(_req.body.target)) && !isNaN(Number(Array(_req.body.daily_exercises))) && Array(_req.body.daily_exercises)) {
    res.send(calculateExercises(Number(_req.body.target) , Array(_req.body.daily_exercises)));
  } else if (isNaN(Number(_req.body.target)) || isNaN(Number(Array(_req.body.daily_exercises)))) {
    res.send({
      'error': "malformatted parameters"
    });
  } else {
    res.send({
      'error': "parameters missing"
    });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});