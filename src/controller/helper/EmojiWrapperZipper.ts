import EmojiWrapper from "../../wrapper/EmojiWrapper";

function* EmojiWrapperGenerator(wrappers: EmojiWrapper[]): Generator<EmojiWrapper[]> {
    for(let i = 0; i < wrappers.length; i++) {
        const wrapper_i = wrappers[i];
        for(let j = i + 1; j < wrappers.length; j++) {
            const wrapper_j = wrappers[j];
            yield [wrapper_i, wrapper_j];
        }
    }
}

class EmojiWrapperZipper {
    private readonly generator: Generator<EmojiWrapper[]>;
    private nextValue: IteratorResult<EmojiWrapper[], EmojiWrapper[]>;

    constructor(wrappers: EmojiWrapper[]) {
        this.generator = EmojiWrapperGenerator(wrappers);
        this.nextValue = this.generator.next();
    }

    next(): EmojiWrapper[] {
        const result = this.nextValue.value;
        this.nextValue = this.generator.next();
        return result;
    }

    hasNext(): boolean {
        return !this.nextValue.done;
    }

}

export default EmojiWrapperZipper;
