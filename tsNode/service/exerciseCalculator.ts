type Objective = {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const processArguments = (args: Array<string>): Array<number> => {
    return args.map(a => {
        const parsed = parseInt(a)
        if (isNaN(parsed)) {
            throw new Error('Invalid arguments')
        }
        return parsed
    })
}

const calculateExercises = (exercises: Array<number>, target: number): Objective => {

    const trainingDays: number = exercises.filter(day => day > 0).length
    const total: number = exercises.reduce((acc, curr) => acc + curr, 0)
    const average: number = total / exercises.length
    let rating: number
    let ratingDesc: string

    if (average > 3 * trainingDays / exercises.length) {
        rating = 3
        ratingDesc = 'Excellent! Keep on good job.'
    } else if (average > 2 * trainingDays / exercises.length) {
        rating = 2
        ratingDesc = 'You almost did it! Keep on working.'
    } else {
        rating = 1
        ratingDesc = 'Needs bit more effort, dont you think?'
    }

    return {
        periodLength: exercises.length,
        trainingDays: trainingDays,
        success: average > target,
        rating: rating,
        ratingDescription: ratingDesc,
        target: target,
        average: average,
    }
}

try {
    const hours: Array<number> = processArguments(process.argv.slice(3))
    console.log(calculateExercises(hours.slice(1), hours[0]))
} catch (error: unknown) {
    let errorMsg: string = 'Something went wrong'
    if (error instanceof Error) {
        errorMsg += ' Error: ' + error.message
    }
    console.log(errorMsg)
}
