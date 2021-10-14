import express from 'express';
import { calculateBmi } from './bmiCalculator';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (_req, res) => {
  console.log(_req.query)
  if (!isNaN(Number(_req.query.Height)) && !isNaN(Number(_req.query.weight))) {
    res.send({
      'height': _req.query.Height,
      'weight': _req.query.weight,
      'bmi': calculateBmi(Number(_req.query.Height),Number(_req.query.weight))
  })
} else {
  res.send({
    'error': "malformatted parameters"
  })
}});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});