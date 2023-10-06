import ISimulationController from "../ui/ISimulationController";

interface IEmojiStateChangeListener {
    update(simulationController: ISimulationController);
}

export default IEmojiStateChangeListener;
