const calculateBmi = (length: number, weight: number): string => {
    const bmi = parseFloat((weight / Math.pow(length / 100, 2)).toFixed(2))
    if (bmi <= 18) {
        return 'Underweight range'
    }
    if (bmi > 18 && bmi <= 24) {
        return 'Normal range'
    }
    if (bmi >= 25 && bmi <= 29) {
        return 'Light overweight range'
    }
    if (bmi >= 30 && bmi <= 35) {
        return 'Overweight range'
    }
    if (bmi > 35) {
        return 'Extreme overweight range'
    }
    return 'Not valid inputs'
}
console.log(calculateBmi(180, 72))
