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
 * @param {EventType} eventType
 *
 * @return {string}
 */
const getLocationsForEventType = (eventType) => {
  const eventTypeLocations = LOCATIONS.filter((location) => location.eventTypes.has(eventType.code));
  return shuffleArray(eventTypeLocations).slice(0, getRandomNumber(2, 4));
};


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
const getEvent = () => {
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

  const type = Object.assign({}, getRandomType(EventType));
  const locations = getLocationsForEventType(type);
  const currentLocation = locations[getRandomNumber(0, locations.length - 1)];

  lastEventDate = dateEnd;

  return {
    price: roundToStep(getRandomNumber(50, 150), 25),
    isFavorite: Math.random() >= 0.5,
    currentLocation,
    locations,
    dateStart,
    dateEnd,
    get offers() {
      return [...OFFERS].filter((offer) => {
        const [, data] = offer;

        return data.eventTypes.has(this.type.code);
      });
    },
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
const getEvents = (count) => new Array(count).fill(``).map(() => getEvent());

export {
  getEvent,
  getEvents,
  getLocationsForEventType,
};
