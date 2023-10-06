import { EMOJIS } from "../const/emojis";
import IEmojiStateChangeListener from "../controller/IEmojiStateChangeListener";
import Timer, { TimerListener } from "../utils/classes/Timer";
import ISimulationController from "./ISimulationController";

class UIController implements TimerListener, IEmojiStateChangeListener {
    private readonly button: HTMLElement;
    private readonly timerOutput: HTMLElement;
    private readonly freqsOutput: HTMLElement;

    constructor(invokable: ISimulationController) {
        this.button = document.getElementById("controls-stop");
        this.button.addEventListener("click", () => {
            invokable.stop();
        });
        this.timerOutput = document.getElementById("controls-timer");
        this.timerOutput.setAttribute("class", "non-selectable");
        this.freqsOutput = document.getElementById("controls-freqs");
        this.freqsOutput.setAttribute("class", "non-selectable");
    }

    timeUpdate(timer: Timer) {
        this.timerOutput.innerHTML = timer.getFormattedTime();
    }

    update(simulationController: ISimulationController) {
        const freqs = simulationController.getEmojiFrequencies().getFrequencies();
        const sb = [];
        for(const emoji of EMOJIS) {
            sb.push(emoji + " " + freqs[emoji]);
        }
        this.freqsOutput.innerHTML = sb.join(" | ");
    }

}

export default UIController;
