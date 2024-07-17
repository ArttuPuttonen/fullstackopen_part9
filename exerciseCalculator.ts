import { parseArguments } from './utils';

interface ExerciseResult {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

function calculateExercises(dailyHours: number[], target: number): ExerciseResult {
    const periodLength = dailyHours.length;
    const trainingDays = dailyHours.filter(day => day > 0).length;
    const totalHours = dailyHours.reduce((acc, curr) => acc + curr, 0);
    const average = totalHours / periodLength;
    const success = average >= target;

    let rating: number;
    let ratingDescription: string;

    if (average >= target) {
        rating = 3;
        ratingDescription = "Excellent job!";
    } else if (average >= target * 0.75) {
        rating = 2;
        ratingDescription = "Not too bad but could be better";
    } else {
        rating = 1;
        ratingDescription = "You need to work harder";
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };
}

if (require.main === module) {
    try {
        const args = process.argv.slice(2);
        const target = parseArguments([args[0]])[0];
        const dailyHours = parseArguments(args.slice(1));

        console.log(calculateExercises(dailyHours, target));
    } catch (e) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        console.log('Error:', e.message);
    }
}

export { calculateExercises };
