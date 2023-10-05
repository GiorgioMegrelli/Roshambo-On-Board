export const getRandomInt = (min: number, max: number) => {
    // min - Inclusive
    // max - Exclusive
    return Math.floor(Math.random() * (max - min)) + min;
};
