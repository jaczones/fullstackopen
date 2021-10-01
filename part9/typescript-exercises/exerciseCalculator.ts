interface Exercise { 
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number; 
}


const calculateExercises = (hours: Array<number>, target: number): Exercise => {
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))