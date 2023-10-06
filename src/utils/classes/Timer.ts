export interface TimerListener {
    timeUpdate(timer: Timer);
}

class Timer {
    private static readonly MS_IN_SECOND = 1000;

    private seconds = 0;
    private timer: NodeJS.Timeout | null = null;
    private readonly listeners: TimerListener[] = [];

    addListener(listener: TimerListener) {
        this.listeners.push(listener);
    }

    start() {
        this.stop();
        this.invokeListeners();
        this.timer = setInterval(() => {
            this.seconds += 1;
            this.invokeListeners();
        }, Timer.MS_IN_SECOND);
    }

    stop() {
        if(this.timer !== null) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }

    reset() {
        this.seconds = 0;
    }

    getTime(): {"h": number, "m": number, "s": number} {
        let seconds = this.seconds;
        const s = seconds % 60;
        seconds = Math.floor(seconds / 60);
        const m = seconds % 60;
        seconds = Math.floor(seconds / 60);
        const h = seconds % 60;
        return {"h": h, "m": m, "s": s};
    }

    getFormattedTime(): string {
        const {h, m , s} = this.getTime();
        const hStr = h.toFixed().padStart(2, "0");
        const mStr = m.toFixed().padStart(2, "0");
        const sStr = s.toFixed().padStart(2, "0");
        return hStr + ":" + mStr + ":" + sStr;
    }

    private invokeListeners() {
        for(const listener of this.listeners) {
            listener.timeUpdate(this);
        }
    }

}

export default Timer;
