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
export const EventTypeEnum = Object.freeze({
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

/**
 * @readonly
 * @const {Set} Predefined list of available cities.
 */
export const CITIES = new Set([`New York`, `London`, `Paris`]);

/**
 * Enum for time in millisecond.
 *
 * @readonly
 * @enum {number}
 */
export const MillisecondsEnum = Object.freeze({
  MINUTE: 60 * 1000,
  HOUR: 60 * 60 * 1000,
  DAY: 24 * 60 * 60 * 1000,
});
