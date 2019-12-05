import moment from 'moment';
import {EventTypeEnum, CITIES} from '../mock/consts';
import {capitalize} from '../utils';

const activities = Object.values(EventTypeEnum).filter((type) => type.group === `activity`);
const transfers = Object.values(EventTypeEnum).filter((type) => type.group === `transfer`);

/**
 * @param {Array} options
 *
 * @return {string}
 */
const getTypeOptionsTemplate = (options) => {
  return options.reduce((template, option) => {
    return (
      `${template}<div class="event__type-item">
        <input id="event-type-${option.code}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${option.code}">
        <label class="event__type-label  event__type-label--${option.code}" for="event-type-${option.code}-1">${capitalize(option.code)}</label>
      </div>`
    );
  }, ``);
};

/**
 * @param {Iterable} offers
 *
 * @return {string}
 */
const getOffersTemplate = (offers) => {
  return [...offers].reduce((template, offer) => {
    const offerCode = offer[0];
    offer = offer[1];

    return (
      `${template}
      <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden"
               id="event-offer-${offerCode}-1"
               type="checkbox"
               name="event-offer-${offerCode}"
               ${offer.isChecked ? `checked` : ``}
        >
        <label class="event__offer-label" for="event-offer-${offerCode}-1">
          <span class="event__offer-title">${offer.title}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
        </label>
      </div>`
    );
  }, ``);
};

/**
 * @param {Object} event
 *
 * @return {string}
 */
export const getEventFormTemplate = (event) => {
  const dateFormat = `DD/MM/YY HH:mm`;
  const dateStart = moment(event.dateStart).format(dateFormat);
  const dateEnd = moment(event.dateEnd).format(dateFormat);
  const cities = [...CITIES].reduce((template, city) => {
    return `${template}<option value="${city}"></option>`;
  }, ``);

  const photos = event.attractionImages.reduce((template, photo) => {
    return `${template}<img class="event__photo" src="${photo}" alt="Event photo">`;
  }, ``);

  const isChecked = event.isFavorite ? `checked` : ``;

  return (
    `<form class="event  event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${event.type.code}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Transfer</legend>
              ${getTypeOptionsTemplate(transfers)}
            </fieldset>

            <fieldset class="event__type-group">
              <legend class="visually-hidden">Activity</legend>
              ${getTypeOptionsTemplate(activities)}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${capitalize(event.type.code)} at
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${event.location}" list="destination-list-1">
          <datalist id="destination-list-1">${cities}</datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">
            From
          </label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateStart}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">
            To
          </label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateEnd}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${event.price}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>

        <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isChecked}>
        <label class="event__favorite-btn" for="event-favorite-1">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </label>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>

      <section class="event__details">

        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">${getOffersTemplate(event.offers)}</div>
        </section>

        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${event.description}</p>

          <div class="event__photos-container">
            <div class="event__photos-tape">${photos}</div>
          </div>
        </section>
      </section>
    </form>`
  );
};
