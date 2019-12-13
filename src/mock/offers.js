import {getRandomNumber, roundToStep} from '../utils/common';

const OFFERS = new Map([
  [
    `luggage`, {
      isChecked: Math.random() >= 0.5,
      title: `Add luggage`,
      price: roundToStep(getRandomNumber(10, 40), 5),
      eventTypes: new Set([`taxi`, `bus`, `train`, `ship`, `transport`, `flight`, `drive`]),
    }
  ],
  [
    `comfort`, {
      isChecked: Math.random() >= 0.5,
      title: `Switch to comfort class`,
      price: roundToStep(getRandomNumber(10, 40), 5),
      eventTypes: new Set([`check-in`, `restaurant`, `train`, `ship`, `flight`, `transport`, `drive`]),
    }
  ],
  [
    `meal`, {
      isChecked: Math.random() >= 0.5,
      title: `Add meal`,
      price: roundToStep(getRandomNumber(10, 40), 5),
      eventTypes: new Set([`train`, `ship`, `flight`, `transport`, `drive`]),
    }
  ],
  [
    `seats`, {
      isChecked: Math.random() >= 0.5,
      title: `Choose seats`,
      price: roundToStep(getRandomNumber(10, 40), 5),
      eventTypes: new Set([`restaurant`, `bus`, `train`, `flight`, `transport`]),
    }
  ],
  [
    `train`, {
      isChecked: Math.random() >= 0.5,
      title: `Travel by train`,
      price: roundToStep(getRandomNumber(10, 40), 5),
      eventTypes: new Set([`sightseeing`]),
    }
  ],
]);

export {OFFERS};
