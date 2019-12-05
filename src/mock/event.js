import {EventTypeEnum, MillisecondsEnum, CITIES} from './consts';
import {getRandomDescription, getRandomNumber, roundToStep} from '../utils';

/**
 * @param {EventType} types
 *
 * @return {EventType}
 */
const getRandomType = (types) => {
  const values = Object.values(types).map((type) => type.code);

  return values[Math.floor(Math.random() * values.length)];
};

/**
 * @param {Set} cities
 *
 * @return {string}
 */
const getRandomCity = (cities) => {
  return [...cities][Math.floor(Math.random() * cities.size)];
};


/**
 * Store dateEnd of last rendered event.
 *
 * @type {number}
 */
let lastEventData = Date.now();


/**
 * Generate mock data for trip event.
 *
 * @return {Object}
 */
export const getEvent = () => {
  const offers = new Map([
    [
      `luggage`, {
        isChecked: Math.random() >= 0.5,
        title: `Add luggage`,
        price: roundToStep(getRandomNumber(10, 40), 5),
      }
    ],
    [
      `comfort`, {
        isChecked: Math.random() >= 0.5,
        title: `Switch to comfort class`,
        price: roundToStep(getRandomNumber(10, 40), 5),
      }
    ],
    [
      `meal`, {
        isChecked: Math.random() >= 0.5,
        title: `Add meal`,
        price: roundToStep(getRandomNumber(10, 40), 5),
      }
    ],
    [
      `seats`, {
        isChecked: Math.random() >= 0.5,
        title: `Choose seats`,
        price: roundToStep(getRandomNumber(10, 40), 5),
      }
    ],
    [
      `train`, {
        isChecked: Math.random() >= 0.5,
        title: `Travel by train`,
        price: roundToStep(getRandomNumber(10, 40), 5),
      }
    ],
  ]);

  const dateStart = roundToStep(
      getRandomNumber(
          lastEventData,
          lastEventData + getRandomNumber(2, 3) * MillisecondsEnum.HOUR
      ),
      30 * MillisecondsEnum.MINUTE
  );
  const dateEnd = roundToStep(
      getRandomNumber(
          dateStart + getRandomNumber(1, 2) * MillisecondsEnum.HOUR,
          dateStart + getRandomNumber(2, 4) * MillisecondsEnum.HOUR
      ),
      30 * MillisecondsEnum.MINUTE
  );

  lastEventData = dateEnd;

  return {
    type: getRandomType(EventTypeEnum),
    location: getRandomCity(CITIES),
    attractionImages: new Array(5).fill(``).map((_) => `http://picsum.photos/300/150?r=${Math.random()}`),
    description: getRandomDescription(),
    price: roundToStep(getRandomNumber(50, 150), 25),
    isFavorite: Math.random() >= 0.5,
    dateStart,
    dateEnd,
    offers,
  };
};

/**
 * Generate event mock data for passed amount.
 *
 * @param {number} count
 *
 * @return {Array}
 */
export const getEvents = (count) => new Array(count).fill(``).map((_) => getEvent());

/**
 * Group array of events by day.
 *
 * @param {Array} events
 *
 * @return {Map}
 */
export const groupEventsByDays = (events) => {
  let counter = 0;

  events.sort((current, next) => current.dateStart - next.dateStart);

  return events.reduce((days, event) => {
    let currentDayKey = new Date(event.dateStart).setHours(0, 0, 0, 0);

    if (days.has(currentDayKey)) {
      days.get(currentDayKey).events.push(event);
    } else {
      days.set(currentDayKey, {
        date: event.dateStart,
        counter,
        events: [event],
      });

      counter++;
    }

    return days;
  }, new Map());
};
