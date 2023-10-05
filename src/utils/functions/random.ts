export const getRandomInt = (min: number, max: number): number => {
    // min - Inclusive
    // max - Exclusive
    return Math.floor(Math.random() * (max - min)) + min;
};

export const shuffle = (arr: any[]) => {
    for(let i = arr.length - 1; i > 0; i--) {
        const index = getRandomInt(0, i + 1);
        const tmp = arr[i];
        arr[i] = arr[index];
        arr[index] = tmp;
    }
    return arr;
};
