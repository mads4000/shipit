const gpio = require('rpi-gpio');
const async = require('async');

gpio.setMode(gpio.MODE_BCM)

// GPIO17,GPIO18,GPIO21,GPIO22
const stepPins = [11, 12, 13, 15];
// Read wait time from command line
const waitTime = 10 / 1000;
// Define advanced sequence
// as shown in manufacturers datasheet
const seq = [[1, 0, 0, 1],
[1, 0, 0, 0],
[1, 1, 0, 0],
[0, 1, 0, 0],
[0, 1, 1, 0],
[0, 0, 1, 0],
[0, 0, 1, 1],
[0, 0, 0, 1]];


function setupPin(pin) {
  return new Promise((resolve, reject) => {
    gpio.setup(pin, gpio.DIR_OUT, err => {
      if (err) {
        return reject(err);
      }
      console.log(`Pin ${pin} was setup`);
      return resolve(pin);
    });
  });
}


function write(pin, direction) {
  return new Promise((resolve, reject) => {
    gpio.output(pin, direction, err => {
      if (err) {
        return reject(err);
      }
      console.log(`Pin ${pin} was set to ${direction}`);
      return resolve(pin, direction);
    });
  });
}

function setupAllPins() {
  const allPinsSetup = stepPins.map(pin => setupPin(pin));
  return Promise.all(allPinsSetup).then(() => console.log('all pins setup', stepPins));
}

function writeAllPins(values) {
  const allPinsWritten = values.map((value, index) => write(stepPins[index], value));
  return Promise.all(allPinsWritten).then(() => console.log('all prins written', values));
}

function setup() {
  return setupAllPins()
    .then(() => writeAllPins([0, 0, 0, 0]))
    .then(() => console.log('All pins should be turned off'));
}

function step(stepCounter) {
  const allPins = [];

  stepPins.forEach((pin, index) => {
    if (seq[stepCounter][index] !== 0) {
      allPins.push(write(pin, true));
    } else {
      allPins.push(write(pin, false));
    }
  });

  return Promise.all(allPins).then(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(stepCounter += 1), waitTime);
    });
  });
}

//Start main loop
function sequenzer() {
  step(0)
    .then(step)
    .then(step)
    .then(step)
    .then(step)
    .then(step)
    .then(step)
    .then(step)
    .then(sequenzer());
}

setup().then(() => sequenzer);









