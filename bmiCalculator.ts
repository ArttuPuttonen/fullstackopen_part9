import { parseArguments } from './utils';

const calculateBMI = (height: number, weight: number): string => {
    const bmi = weight / Math.pow(height / 100, 2);
    if (bmi < 18.5) {
        return 'Underweight';
    } else if (bmi < 25) {
        return 'Normal (healthy weight)';
    } else if (bmi < 30) {
        return 'Overweight';
    } else {
        return 'Obese';
    }
    }

    if (require.main === module) {
        try {
            const [height, weight] = parseArguments(process.argv.slice(2));
            console.log(calculateBMI(height, weight));
        } catch (e) {
            console.log('Error:', e.message);
        }
    }
    
    export { calculateBMI };