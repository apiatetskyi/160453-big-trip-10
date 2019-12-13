import {EventType, DurationType} from './consts';
import {LOCATIONS} from './locations';
import {OFFERS} from './offers';
import {getRandomNumber, roundToStep, shuffleArray} from '../utils/common';

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
 * @param {Array} locations
 *
 * @return {string}
 */
const getRandomLocation = (locations) => shuffleArray(locations).slice(0, getRandomNumber(1, 3));


/**
 * Store dateEnd of last rendered event.
 *
 * @type {number}
 */
let lastEventDate = Date.now();


/**
 * Generate mock data for trip event.
 *
 * @return {Object}
 */
export const getEvent = () => {
  const dateStart = roundToStep(
      getRandomNumber(
          lastEventDate,
          lastEventDate + getRandomNumber(2, 3) * DurationType.HOUR
      ),
      30 * DurationType.MINUTE
  );

  const dateEnd = roundToStep(
      getRandomNumber(
          dateStart + getRandomNumber(1, 2) * DurationType.HOUR,
          dateStart + getRandomNumber(2, 4) * DurationType.HOUR
      ),
      30 * DurationType.MINUTE
  );

  const type = getRandomType(EventType);
  const locations = getRandomLocation(LOCATIONS.filter((location) => location.eventTypes.has(type.code)));
  const currentLocation = locations[getRandomNumber(0, locations.length - 1)];
  const offers = [...OFFERS].filter((offer) => {
    const [, data] = offer;

    return data.eventTypes.has(type.code);
  });

  lastEventDate = dateEnd;

  return {
    price: roundToStep(getRandomNumber(50, 150), 25),
    isFavorite: Math.random() >= 0.5,
    currentLocation,
    locations,
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
