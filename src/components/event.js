import moment from 'moment';
import {capitalize} from '../utils';
import {MillisecondsEnum} from '../mock/consts';
import {getEventPlaceholder} from '../mock/event';

/**
 * @param {number} diff Difference between dateStart dateEnd in milliseconds.
 *
 * @return {string} Event duration string for template
 */
const getDurationString = (diff) => {
  const partials = {
    days: [`D`, MillisecondsEnum.DAY],
    hours: [`H`, MillisecondsEnum.HOUR],
    minutes: [`M`, MillisecondsEnum.MINUTE],
  };

  return Object.keys(partials).reduce((result, part) => {
    let amount = Math.floor(diff / partials[part][1]) || 0;

    if (amount !== 0) {
      diff = diff - amount * partials[part][1];
      amount = `${amount}`.length === 1 ? `0${amount}` : amount;
    }

    return amount !== 0 ? `${result} ${amount}${partials[part][0]}` : result;

  }, ``);
};

/**
 * @param {Iterable} offers
 *
 * @return {string}
 */
const getOffersTemplate = (offers) => {
  return [...offers]
    .filter((offer) => offer[1].isChecked)
    .slice(0, 2)
    .reduce((template, offer) => {
      const offerCode = offer[0];
      offer = offer[1];
      return (
        `${template}<li class="event__offer">
          <span class="event__offer-title">${capitalize(offerCode)}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
        </li>`
      );
    }, ``);
};

/**
 * Get HTML string template for event.
 *
 * @param {Object} event
 * @return {string}
 */
export const getEventTemplate = (event) => {
  const dateStart = moment(event.dateStart).format(`HH:mm`);
  const dateStartISO = moment(event.dateStart).toISOString();
  const dateEnd = moment(event.dateEnd).format(`HH:mm`);
  const dateEndISO = moment(event.dateEnd).toISOString();
  const diff = event.dateEnd - event.dateStart;

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${event.type.code}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${capitalize(event.type.code)} ${getEventPlaceholder(event.type)} ${event.location.name}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${dateStartISO}">${dateStart}</time>
            &mdash;
            <time class="event__end-time" datetime="${dateEndISO}">${dateEnd}</time>
          </p>
          <p class="event__duration">${getDurationString(diff)}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${event.price}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${getOffersTemplate(event.offers)}
        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};
