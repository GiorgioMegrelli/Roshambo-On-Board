import EmojiCounter from "../wrapper/EmojiCounter";

interface ISimulationController {
    stop();
    isStopped(): boolean;
    getEmojiFrequencies(): EmojiCounter;
}

export default ISimulationController;
