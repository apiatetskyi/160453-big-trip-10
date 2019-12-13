import {EventType} from './consts';
import {getRandomDescription} from '../utils/common';

const cityEventTypes = Object.values(EventType)
  .filter((type) => type.group === `transfer`)
  .map((type) => type.code);

/**
 * @readonly
 * @const {Array} Predefined list of available locations.
 */
const LOCATIONS = [
  {
    name: `New York`,
    type: `city`,
    eventTypes: new Set(cityEventTypes),
    description: getRandomDescription(),
    photos: new Array(5).fill(``).map(() => `http://picsum.photos/300/150?r=${Math.random()}`),
  },
  {
    name: `London`,
    type: `city`,
    eventTypes: new Set(cityEventTypes),
    description: getRandomDescription(),
    photos: new Array(5).fill(``).map(() => `http://picsum.photos/300/150?r=${Math.random()}`),
  },
  {
    name: `Berlin`,
    type: `city`,
    eventTypes: new Set(cityEventTypes),
    description: getRandomDescription(),
    photos: new Array(5).fill(``).map(() => `http://picsum.photos/300/150?r=${Math.random()}`),
  },
  {
    name: `Airport 1`,
    type: `airport`,
    eventTypes: new Set([`train`, `taxi`, `drive`]),
    description: getRandomDescription(),
    photos: new Array(5).fill(``).map(() => `http://picsum.photos/300/150?r=${Math.random()}`),
  },
  {
    name: `Airport 2`,
    type: `airport`,
    eventTypes: new Set([`train`, `taxi`, `drive`]),
    description: getRandomDescription(),
    photos: new Array(5).fill(``).map(() => `http://picsum.photos/300/150?r=${Math.random()}`),
  },
  {
    name: `Museum 1`,
    type: `museum`,
    eventTypes: new Set([`train`, `taxi`, `drive`, `sightseeing`]),
    description: getRandomDescription(),
    photos: new Array(5).fill(``).map(() => `http://picsum.photos/300/150?r=${Math.random()}`),
  },
  {
    name: `Museum 2`,
    type: `museum`,
    eventTypes: new Set([`train`, `taxi`, `drive`, `sightseeing`]),
    description: getRandomDescription(),
    photos: new Array(5).fill(``).map(() => `http://picsum.photos/300/150?r=${Math.random()}`),
  },
  {
    name: `Restaurant 1`,
    type: `restaurant`,
    eventTypes: new Set([`train`, `taxi`, `drive`, `restaurant`]),
    description: getRandomDescription(),
    photos: new Array(5).fill(``).map(() => `http://picsum.photos/300/150?r=${Math.random()}`),
  },
  {
    name: `Restaurant 2`,
    type: `restaurant`,
    eventTypes: new Set([`train`, `taxi`, `drive`, `restaurant`]),
    description: getRandomDescription(),
    photos: new Array(5).fill(``).map(() => `http://picsum.photos/300/150?r=${Math.random()}`),
  },
  {
    name: `Hotel 1`,
    type: `hotel`,
    eventTypes: new Set([`train`, `taxi`, `drive`, `check-in`]),
    description: getRandomDescription(),
    photos: new Array(5).fill(``).map(() => `http://picsum.photos/300/150?r=${Math.random()}`),
  },
  {
    name: `Hotel 2`,
    type: `hotel`,
    eventTypes: new Set([`train`, `taxi`, `drive`, `check-in`]),
    description: getRandomDescription(),
    photos: new Array(5).fill(``).map(() => `http://picsum.photos/300/150?r=${Math.random()}`),
  },
];

export {LOCATIONS};
