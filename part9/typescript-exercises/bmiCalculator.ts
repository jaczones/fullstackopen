//The BMI is defined as the body mass divided by the square of the body height

type Result = string;

interface bmiValues {
  value1: number;
  value2: number;
}

const parseArguments = (args: Array<string>): bmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

export const calculateBmi = (height: number, mass: number) : Result => {
  let m = height/100;
  let h = m * m;
  let bmi = mass/h;
  console.log(bmi)
  if (bmi < 18.5) {
    return "Underweight";
  }
  else if (bmi < 24.9) {
    return "Normal (healthy weight)"
  }
  else if (bmi < 29) {
    return "Overweight"
  } return "Obese"
}

try {
  const { value1, value2 } = parseArguments(process.argv);
  console.log(calculateBmi(value1, value2));
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}
