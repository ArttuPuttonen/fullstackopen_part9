//eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isNotNumber = (argument: any): boolean => isNaN(Number(argument));

export const parseArguments = (args: string[]): number[] => {
    return args.map(arg => {
        if (isNotNumber(arg)) {
            throw new Error('Provided values were not numbers!');
        }
        return Number(arg);
    });
};