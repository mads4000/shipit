const gpio = require('rpi-gpio');

gpio.setMode(gpio.MODE_BCM)

// GPIO17,GPIO18,GPIO21,GPIO22
const stepPins = [17, 18, 27, 22];

// Set all pins as output
for (let pin of stepPins) {
  console.log(`Setup pins ${pin}`);
  gpio.setup(pin, gpio.DIR_OUT);
  gpio.output(pin, false);
}

// // Define advanced sequence
// // as shown in manufacturers datasheet
// const seq = [[1, 0, 0, 1],
// [1, 0, 0, 0],
// [1, 1, 0, 0],
// [0, 1, 0, 0],
// [0, 1, 1, 0],
// [0, 0, 1, 0],
// [0, 0, 1, 1],
// [0, 0, 0, 1]];

// const stepCount = seq.length;

// const stepDir = 1; // Set to 1 or 2 for clockwise
// // Set to -1 or -2 for anti-clockwise

// // Read wait time from command line
// const waitTime = 10 / 1000;

// //Initialise variables
// let stepCounter = 0;

// //Start main loop
// function step() {
//   console.log(stepCounter);
//   console.log(seq[stepCounter]);

//   for (let i = 0; i < 4; i++) {
//     const xpin = stepPins[i];
//     if (seq[stepCounter][i] !== 0) {
//       console.log(`Enable gpio ${xpin}`);
//       gpio.output(xpin, true);
//     } else {
//       gpio.output(xpin, false);
//     }
//   }

//   stepCounter += stepDir;

//   //If we reach the end of the sequence
//   //start again
//   if (stepCounter >= stepCount) {
//     stepCounter = 0;
//   }

//   if (stepCounter < 0) {
//     stepCounter = stepCount + stepDir;
//   }

//   //Wait before moving on
//   setTimeout(step, waitTime);
// }

// step();


