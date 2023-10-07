import { EMOJIS } from "../const/emojis";
import IEmojiStateChangeListener from "../controller/IEmojiStateChangeListener";
import Timer, { TimerListener } from "../utils/classes/Timer";
import ISimulationController from "./ISimulationController";

class UIController implements TimerListener, IEmojiStateChangeListener {
    private readonly button: HTMLElement;
    private readonly timerOutput: HTMLElement;
    private readonly freqsOutput: HTMLElement;
    private readonly winnerView: HTMLElement;
    private readonly winnerViewText: HTMLElement;
    private readonly timer = new Timer();

    constructor(invokable: ISimulationController) {
        this.button = document.getElementById("controls-stop");
        this.button.addEventListener("click", () => {
            invokable.stop();
        });
        this.timerOutput = document.getElementById("controls-timer");
        this.timerOutput.setAttribute("class", "non-selectable");
        this.freqsOutput = document.getElementById("controls-freqs");
        this.freqsOutput.setAttribute("class", "non-selectable");
        this.winnerView = document.getElementById("winner-view");
        this.winnerViewText = document.getElementById("winner-view-text");
        this.winnerViewText.setAttribute("class", "non-selectable");
        this.timer.addListener(this);
        this.timer.start();
    }

    timeUpdate(timer: Timer) {
        this.timerOutput.innerHTML = timer.getFormattedTime();
    }

    update(simulationController: ISimulationController) {
        const freqs = simulationController.getEmojiFrequencies().getFrequencies();        
        this.freqsOutput.innerHTML = EMOJIS.map((emoji) => {
            return emoji + " " + freqs[emoji];
        }).join(" | ");

        if(simulationController.isStopped()) {
            const winner = simulationController.getWinner();
            this.timer.stop();
            if(winner !== null) {
                this.showResult(winner);
            }
        }
    }

    private showResult(winner: string) {
        this.winnerViewText.innerHTML = "Winner: " + winner;
        this.winnerView.style.display = "block";
    }

}

export default UIController;
