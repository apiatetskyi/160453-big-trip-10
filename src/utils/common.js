import {MillisecondsEnum} from '../mock/consts';

/**
 * @param {Array} array
 *
 * @return {array}
 */
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};

/**
 * @return {string}
 */
const getRandomDescription = () => {
  const template = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

  return shuffleArray(template.split(`.`).map((sentence) => sentence.trim()))
      .slice(0, getRandomNumber(1, 2))
      .join(`. `)
      .concat(`.`);
};

/**
 * Get random number in range.
 *
 * @param {number} [min=0]
 * @param {number} [max=10]
 *
 * @return {number}
 */
const getRandomNumber = (min = 0, max = 10) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Capitalize first latter.
 *
 * @param {string} string
 *
 * @return {string}
 */
const capitalize = (string) => {
  return typeof string !== `string` ?
    `` :
    string.charAt(0).toUpperCase() + string.slice(1);
};

/**
 * Round number to passed step.
 *
 * @param {number} value
 * @param {number} step
 *
 * @return {number}
 */
const roundToStep = (value, step = 10) => Math.round(value / step) * step;

/**
 * Group array of events by day.
 *
 * @param {Array} events
 *
 * @return {Map}
 */
const groupEventsByDays = (events) => {
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

/**
 * Get placeholder for trip event name.
 *
 * @param {EventType} type
 *
 * @return {string}
 */
const getEventPlaceholder = (type) => {
  let placeholder = ``;

  if (type.group === `activity`) {
    placeholder = `in`;
  } else if (type.group === `transfer`) {
    placeholder = `to`;
  }

  return placeholder;
};

/**
 * Get template for trip event duration.
 *
 * @param {number} diff Difference between dateStart dateEnd in milliseconds.
 *
 * @return {string} EventComponent duration string for template
 */
const getEventDurationString = (diff) => {
  const dateParts = [MillisecondsEnum.DAY, MillisecondsEnum.HOUR, MillisecondsEnum.MINUTE];
  const dateFormats = [`D`, `H`, `M`];

  return dateParts.map((part, index) => {
    let amount = Math.floor(diff / part) || 0;

    if (amount !== 0) {
      diff = diff - amount * part;
      amount = `${amount}`.length === 1 ? `0${amount}` : amount;
    }

    return amount !== 0 ? `${amount}${dateFormats[index]}` : ``;

  }).join(`\n`);
};

export {
  getEventPlaceholder,
  shuffleArray,
  getRandomNumber,
  getEventDurationString,
  getRandomDescription,
  groupEventsByDays,
  capitalize,
  roundToStep,
};
