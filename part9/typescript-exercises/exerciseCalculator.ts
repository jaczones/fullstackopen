interface Exercise { 
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number; 
}

interface CalcValues {
  value: number
  array: Array<number>
}

const parseArguments = (args: Array<string>): CalcValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.slice(2).some(entry => Number(entry) > 24)) {
    throw new Error('There are only 24 hours in a day, adjust you entries.');
  }
  if (args.slice(2).every(entry => !isNaN(Number(entry)))) {
    const value = Number(args[2])
    const array = args.slice(3).map(a => Number(a))
    return { value, array }
  } else {
    throw new Error('Provided values were not all numbers!')
  }
}

const calculateExercises = (target: number, hours: Array<number>): Exercise => {
  const periodLength = hours.length;
  const trainingDays = hours.filter((hour) => hour > 0).length;
  const average = hours.reduce((a, b) => a + b) / periodLength;
  const success = average >= target;
  const rating = average > target ? 3 : average === target ? 2 : 1;
  const ratingDescription = rating > 2 ? "Great Work!" : rating == 2 ? "Not Bad!" :  "Work Harder!";
  return {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average,
  }
}

try {
  const { value, array } = parseArguments(process.argv)
  console.log(calculateExercises(value, array))
} catch (e) {
  console.log(e.message)
}