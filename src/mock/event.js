import {EventTypeEnum, MillisecondsEnum, LOCATIONS} from './consts';
import {getRandomDescription, getRandomNumber, roundToStep} from '../utils';

/**
 * @param {EventType} types
 *
 * @return {EventType}
 */
const getRandomType = (types) => {
  const values = Object.values(types);

  return values[Math.floor(Math.random() * values.length)];
};

/**
 * @param {EventType} type
 *
 * @return {string}
 */
export const getEventPlaceholder = (type) => {
  let placeholder = ``;

  if (type.group === `activity`) {
    placeholder = `in`;
  } else if (type.group === `transfer`) {
    placeholder = `to`;
  }

  return placeholder;
};

/**
 * @param {Array} locations
 *
 * @param {string} eventType
 * @return {string}
 */
const getRandomLocation = (locations, eventType) => {
  locations = locations.filter((location) => location.eventTypes.has(eventType));

  return locations[Math.floor(Math.random() * locations.length)];
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

  const type = getRandomType(EventTypeEnum);

  lastEventData = dateEnd;

  return {
    location: getRandomLocation(LOCATIONS, type.code),
    attractionImages: new Array(5).fill(``).map((_) => `http://picsum.photos/300/150?r=${Math.random()}`),
    description: getRandomDescription(),
    price: roundToStep(getRandomNumber(50, 150), 25),
    isFavorite: Math.random() >= 0.5,
    dateStart,
    dateEnd,
    offers,
    type,
  };
};

/**
 * Generate event mock data for passed amount.
 *
 * @param {number} count
 *
 * @return {Array}
 */
export const getEvents = (count) => new Array(count).fill(``).map(() => getEvent());

/**
 * Group array of events by day.
 *
 * @param {Array} events
 *
 * @return {Map}
 */
export const groupEventsByDays = (events) => {
  return events.reduce((days, event) => {
    let dayTimestamp = new Date(event.dateStart).setHours(0, 0, 0, 0);

    if (days.has(dayTimestamp)) {
      days.get(dayTimestamp).push(event);
    } else {
      days.set(dayTimestamp, [event]);
    }

    return days;
  }, new Map());
};
