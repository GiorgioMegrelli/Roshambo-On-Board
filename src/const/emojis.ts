export const EMOJI_ROCK = "🪨";
export const EMOJI_SCISSORS = "✂️";
export const EMOJI_PAPER = "📜";
export const EMOJI_RULES = {
    [EMOJI_ROCK]: {
        [EMOJI_PAPER]: -1,
        [EMOJI_ROCK]: 0,
        [EMOJI_SCISSORS]: 1,
    },
    [EMOJI_SCISSORS]: {
        [EMOJI_ROCK]: -1,
        [EMOJI_SCISSORS]: 0,
        [EMOJI_PAPER]: 1,
    },
    [EMOJI_PAPER]: {
        [EMOJI_SCISSORS]: -1,
        [EMOJI_PAPER]: 0,
        [EMOJI_ROCK]: 1,
    },
};
