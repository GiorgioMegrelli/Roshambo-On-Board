export const getRandomInt = (min: number, max: number | null = null): number => {
    // min - Inclusive
    // max - Exclusive
    if(max === null) {
        max = min;
        min = 0;
    }
    return Math.floor(Math.random() * (max - min)) + min;
};

export const shuffle = (arr: any[]) => {
    for(let i = arr.length - 1; i > 0; i--) {
        const index = getRandomInt(i + 1);
        const tmp = arr[i];
        arr[i] = arr[index];
        arr[index] = tmp;
    }
    return arr;
};
