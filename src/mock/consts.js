/**
 * @typedef {Object} EventType
 * @property {string} code Unique code for event type.
 * @property {string} group Key for grouping event types.
 */

/**
 * Enum for event types.
 *
 * @readonly
 * @enum {EventType}
 */
const EventTypeEnum = Object.freeze({
  CHECK: {
    code: `check-in`,
    group: `activity`,
  },
  SIGHTSEEING: {
    code: `sightseeing`,
    group: `activity`,
  },
  RESTAURANT: {
    code: `restaurant`,
    group: `activity`,
  },
  TAXI: {
    code: `taxi`,
    group: `transfer`,
  },
  BUS: {
    code: `bus`,
    group: `transfer`,
  },
  TRAIN: {
    code: `train`,
    group: `transfer`,
  },
  SHIP: {
    code: `ship`,
    group: `transfer`,
  },
  TRANSPORT: {
    code: `transport`,
    group: `transfer`,
  },
  DRIVE: {
    code: `drive`,
    group: `transfer`,
  },
  FLIGHT: {
    code: `flight`,
    group: `transfer`,
  },
});

const cityEventTypes = Object.values(EventTypeEnum)
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
  },
  {
    name: `London`,
    type: `city`,
    eventTypes: new Set(cityEventTypes),
  },
  {
    name: `Berlin`,
    type: `city`,
    eventTypes: new Set(cityEventTypes),
  },
  {
    name: `Airport 1`,
    type: `airport`,
    eventTypes: new Set([`train`, `taxi`, `drive`]),
  },
  {
    name: `Airport 2`,
    type: `airport`,
    eventTypes: new Set([`train`, `taxi`, `drive`]),
  },
  {
    name: `Museum 1`,
    type: `museum`,
    eventTypes: new Set([`train`, `taxi`, `drive`, `sightseeing`]),
  },
  {
    name: `Museum 2`,
    type: `museum`,
    eventTypes: new Set([`train`, `taxi`, `drive`, `sightseeing`]),
  },
  {
    name: `Restaurant 1`,
    type: `restaurant`,
    eventTypes: new Set([`train`, `taxi`, `drive`, `restaurant`]),
  },
  {
    name: `Restaurant 2`,
    type: `restaurant`,
    eventTypes: new Set([`train`, `taxi`, `drive`, `restaurant`]),
  },
  {
    name: `Hotel 1`,
    type: `hotel`,
    eventTypes: new Set([`train`, `taxi`, `drive`, `check-in`]),
  },
  {
    name: `Hotel 2`,
    type: `hotel`,
    eventTypes: new Set([`train`, `taxi`, `drive`, `check-in`]),
  },
];

/**
 * Enum for time in millisecond.
 *
 * @readonly
 * @enum {number}
 */
const MillisecondsEnum = Object.freeze({
  MINUTE: 60 * 1000,
  HOUR: 60 * 60 * 1000,
  DAY: 24 * 60 * 60 * 1000,
});

/**
 * Enum for render position.
 *
 * @readonly
 * @enum {string}
 */
const RenderPosition = Object.freeze({
  AFTER_BEGIN: `afterbegin`,
  AFTER_END: `afterend`,
  BEFORE_END: `beforeend`,
});

/**
 * Enum for keyboard.
 *
 * @readonly
 * @enum {string}
 */
const KeyboardEnum = Object.freeze({
  ESC: `Esc`,
  ESCAPE: `Escape`,
  ENTER: `Enter`,
});

const activities = Object.values(EventTypeEnum).filter((type) => type.group === `activity`);
const transfers = Object.values(EventTypeEnum).filter((type) => type.group === `transfer`);

export {
  EventTypeEnum,
  MillisecondsEnum,
  KeyboardEnum,
  LOCATIONS,
  RenderPosition,
  activities,
  transfers,
};
