//Require Stepper Module
var Stepper = require('./stepper').Stepper;
var Cycle = require('./stepper').Cycle;

//New Stepper Motor Object
var motor = new Stepper(18, 23, 24, 25);

//Single Phase
console.log('Single Phase...');
motor.run();
motor.delay(500);

motor.cycle = Cycle.singlePhaseReverse();
console.log('Reverse...');
motor.run();
motor.delay(500);


//Dual Phase / Full Step
motor.cycle = Cycle.fullStep();
console.log('Full Step...');
motor.run();
motor.delay(500);

motor.cycle = Cycle.fullStepReverse();
console.log('Reverse...');
motor.run();
motor.delay(500);


//Half Step
motor.cycle = Cycle.halfStep();
console.log('Half Step...');
motor.run();
motor.delay(500);

motor.cycle = Cycle.halfStepReverse();
console.log('Reverse...');
motor.run();
motor.delay(500);

//Unexport GPIO Pins
motor.unexport();