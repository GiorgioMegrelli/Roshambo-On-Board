import EmojiCounter from "../wrapper/EmojiCounter";

interface ISimulationController {
    stop();
    isStopped(): boolean;
    getEmojiFrequencies(): EmojiCounter;
    getWinner(): string | null;
}

export default ISimulationController;
