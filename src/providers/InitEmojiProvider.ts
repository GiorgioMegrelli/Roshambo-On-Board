import { EMOJI_PAPER, EMOJI_ROCK, EMOJI_SCISSORS } from "../const/emojis";

export interface InitValueProvider {
    nextValue(): string;
}

export class CyclicInitValueProvider implements InitValueProvider {
    static readonly DEFAULT_ORDER = [
        EMOJI_ROCK, EMOJI_SCISSORS, EMOJI_PAPER
    ];
    private readonly values: string[];
    private index = 0;

    constructor(values: string[] = CyclicInitValueProvider.DEFAULT_ORDER) {
        this.values = values;
    }

    nextValue(): string {
        const value = this.values[this.index];
        this.index += 1;
        this.index %= this.values.length;
        return value;
    }
}
