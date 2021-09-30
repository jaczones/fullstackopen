//The BMI is defined as the body mass divided by the square of the body height

type Result = string;

const calculateBmi = (height: number, mass: number) : Result => {
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

console.log(calculateBmi(180, 74));
