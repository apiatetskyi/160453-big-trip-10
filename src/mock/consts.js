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
const EventType = Object.freeze({
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
 * Enum for time in millisecond.
 *
 * @readonly
 * @enum {number}
 */
const DurationType = Object.freeze({
  MINUTE: 60 * 1000,
  HOUR: 60 * 60 * 1000,
  DAY: 24 * 60 * 60 * 1000,
});

/**
 * Enum for keyboard.
 *
 * @readonly
 * @enum {string}
 */
const KeyName = Object.freeze({
  ESC: `Esc`,
  ESCAPE: `Escape`,
  ENTER: `Enter`,
});

const activities = Object.values(EventType).filter((type) => type.group === `activity`);
const transfers = Object.values(EventType).filter((type) => type.group === `transfer`);

export {
  EventType,
  DurationType,
  KeyName,
  activities,
  transfers,
};
