type Value = 'Underweight' | 'Normal' | 'Obese' | 'Extremely obese'

const calculateBmi = (length: number, weight: number): Value => {
    const bmi = parseFloat((weight / Math.pow(length / 100, 2)).toFixed(2))
    if (bmi <= 18) {
        return 
    }
    if (bmi >= 18 && bmi <= 24) {
        return 'Normal'
    }
    if (bmi >= 25 && bmi <= 29) {
        return 'Light overweight'
    }
    if (bmi >= 30 && bmi <= 35) {
        return 'Overweight'
    }
    if (bmi > 35) {
        return 'Extreme overweight'
    }
}
console.log(calculateBmi(172, 57))
