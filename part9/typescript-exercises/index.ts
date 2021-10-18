/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
//import { calculateExercises } from './exerciseCalculator';
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

app.post('/exercises',(req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { target, hours }: any = req.body;

  if (!target || !hours){
    res.send({
      'error': "Missing parameters"
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  if (isNaN(req.body.target) || hours.find((entry: number) => isNaN((entry)))) {
    res.send({
      'error': "Malformed parameters"
    });
  }
  res.send(calculateExercises(target, hours));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});