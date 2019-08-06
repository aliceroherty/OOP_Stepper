var Gpio = require('onoff').Gpio;

class Stepper {
    constructor(pin1, pin2, pin3, pin4, cycle = Cycle.singlePhase()) {
        this.pin1 = new Gpio(pin1, 'out');
        this.pin1.writeSync(0);

        this.pin2 = new Gpio(pin2, 'out');
        this.pin2.writeSync(0);

        this.pin3 = new Gpio(pin3, 'out');
        this.pin3.writeSync(0);

        this.pin4 = new Gpio(pin4, 'out');
        this.pin4.writeSync(0);

        this.cycle = cycle;
    }

    delay(ms) {
        const startPoint = new Date().getTime();
        while (new Date().getTime() - startPoint <= ms) {/* wait */}
    }

    run(revs = 512) {
        for(i = 0; i < revs; i++) {
            this.Cycle.forEach((pinValues) => {
                this.pin1.writeSync(pinValues[0]);
                this.pin2.writeSync(pinValues[1]);
                this.pin3.writeSync(pinValues[2]);
                this.pin4.writeSync(pinValues[3]);
                if (this.cycle != Cycle.halfStep() && this.cycle != Cycle.halfStepReverse()) {
                    this.delay(1);
                }
                else {
                    this.delay(0.5);
                }
            });
        }
        this.pin1.writeSync(0);
        this.pin2.writeSync(0);
        this.pin3.writeSync(0);
        this.pin4.writeSync(0);
    }

    unexport() {
        this.pin1.writeSync(0);
        this.pin1.unexport();

        this.pin2.writeSync(0);
        this.pin2.unexport();

        this.pin3.writeSync(0);
        this.pin3.unexport();

        this.pin4.writeSync(0);
        this.pin4.unexport();
    }
}

class Cycle {
    static singlePhase() {
        return [
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]
        ];
    }

    static singlePhaseReverse() {
        return [
            [0, 0, 0, 1],
            [0, 0, 1, 0],
            [0, 1, 0, 0],
            [1, 0, 0, 0]
        ];
    }

    static fullStep() {
        return [
            [1, 1, 0, 0],
            [0, 1, 1, 0],
            [0, 0, 1, 1],
            [1, 0, 0, 1]
        ];
    }

    static fullStepReverse() {
        return [
            [1, 0, 0, 1],
            [0, 0, 1, 1],
            [0, 1, 1, 0],
            [1, 1, 0, 0]
        ];
    }

    static halfStep() {
        return [
            [1, 0, 0, 0],
            [1, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 1],
            [0, 0, 0, 1],
            [1, 0, 0, 1]
        ];
    }

    static halfStepReverse() {
        return [
            [1, 0, 0, 1],
            [0, 0, 0, 1],
            [0, 0, 1, 1],
            [0, 0, 1, 0],
            [0, 1, 1, 0],
            [0, 1, 0, 0],
            [1, 1, 0, 0],
            [1, 0, 0, 0],
        ];
    }
}

module.exports = {
    Stepper: Stepper,
    Cycle: Cycle
};