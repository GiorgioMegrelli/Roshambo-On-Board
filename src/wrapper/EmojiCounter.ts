import { EMOJIS, EMOJI_PAPER, EMOJI_ROCK, EMOJI_SCISSORS } from "../const/emojis";
import EmojiWrapper from "./EmojiWrapper";

class EmojiCounter {
    private readonly emojiFrequencies = {};

    constructor(wrappers: EmojiWrapper[]) {
        EMOJIS.forEach((emoji) => {
            this.emojiFrequencies[emoji] = 0
        });

        wrappers.map((wrapper) => {
            return wrapper.getValue();
        }).forEach((emoji) => {
            this.emojiFrequencies[emoji] += 1;
        });
    }

    getFrequencies(): {
        [EMOJI_ROCK]: number,
        [EMOJI_SCISSORS]: number,
        [EMOJI_PAPER]: number,
    } {
        return this.emojiFrequencies as {
            [EMOJI_ROCK]: number,
            [EMOJI_SCISSORS]: number,
            [EMOJI_PAPER]: number,
        };
    }
}

export default EmojiCounter;
