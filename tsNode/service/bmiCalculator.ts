type BmiObject = { weight: number, height: number, bmi: string }

export const calculateBmi = (length: number, weight: number) => {
    const bmi = parseFloat((weight / Math.pow(length / 100, 2)).toFixed(2))
    let bmiResponse = {weight: weight, height: length, bmi: ''}

    if (bmi <= 18) {
        bmiResponse.bmi = 'Underweight range'
        return bmiResponse
    }
    if (bmi > 18 && bmi < 25) {
        bmiResponse.bmi = 'Normal range'
        return bmiResponse
    }
    if (bmi >= 25 && bmi < 30) {
        bmiResponse.bmi = 'Light overweight range'
        return bmiResponse
    }
    if (bmi > 30 && bmi <= 35) {
        bmiResponse.bmi = 'Overweight range'
        return bmiResponse
    }
    if (bmi > 35) {
        bmiResponse.bmi = 'Extreme overweight range'
        return bmiResponse
    }
    throw new Error('Bad parameters')
}

