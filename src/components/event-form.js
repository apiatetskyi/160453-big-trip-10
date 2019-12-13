import moment from 'moment';
import BaseComponent from '../base/component';
import {LOCATIONS, activities, transfers} from '../mock/consts';
import {capitalize, getEventPlaceholder} from '../utils/common';

/**
 * Class representing trip event form.
 *
 * @class EventFormComponent
 * @extends BaseComponent
 */
export default class EventFormComponent extends BaseComponent {

  /**
   * Create a trip event form.
   *
   * @param {Object} event
   */
  constructor(event) {
    super();

    this._event = event;
  }

  /**
   * Setter for component closing.
   *
   * @param {Function} callback
   */
  set onClose(callback) {
    this.addHandler(`form`, `submit`, callback);
    this.addHandler(`.event__rollup-btn`, `click`, callback);
  }

  set onAddToFavorite(callback) {
    this.addHandler(`.event__favorite-checkbox`, `click`, callback);
  }

  set onSetPrice(callback) {
    this.addHandler(`.event__input--price`, `blur`, callback);
  }

  /**
   * Get string template for trip event form.
   *
   * @return {string}
   */
  getTemplate() {
    const dateFormat = `DD/MM/YY HH:mm`;
    const dateStart = moment(this._event.dateStart).format(dateFormat);
    const dateEnd = moment(this._event.dateEnd).format(dateFormat);
    const isChecked = this._event.isFavorite ? `checked` : ``;

    return (
      `<li class="trip-events__item">
        <form class="event  event--edit" action="#" method="post">
          <header class="event__header">
            <div class="event__type-wrapper">
              <label class="event__type  event__type-btn" for="event-type-toggle-1">
                <span class="visually-hidden">Choose event type</span>
                <img class="event__type-icon" width="17" height="17" src="img/icons/${this._event.type.code}.png" alt="Event type icon">
              </label>
              <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
    
              <div class="event__type-list">
                <fieldset class="event__type-group">
                  <legend class="visually-hidden">Transfer</legend>
                  ${this._getTypeOptionsTemplate(transfers)}
                </fieldset>
    
                <fieldset class="event__type-group">
                  <legend class="visually-hidden">Activity</legend>
                  ${this._getTypeOptionsTemplate(activities)}
                </fieldset>
              </div>
            </div>
    
            <div class="event__field-group  event__field-group--destination">
              <label class="event__label  event__type-output" for="event-destination-1">
                ${capitalize(this._event.type.code)} ${getEventPlaceholder(this._event.type)}
              </label>
              <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${this._event.location.name}" list="destination-list-1">
              <datalist id="destination-list-1">${this._getLocationsTemplate()}</datalist>
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
              <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${this._event.price}">
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
    
              <div class="event__available-offers">${this._getOffersTemplate()}</div>
            </section>
    
            <section class="event__section  event__section--destination">
              <h3 class="event__section-title  event__section-title--destination">Destination</h3>
              <p class="event__destination-description">${this._event.description}</p>
    
              <div class="event__photos-container">
                <div class="event__photos-tape">${this._getPhotosTemplate()}</div>
              </div>
            </section>
          </section>
        </form>
      </li>`
    );
  }

  /**
   * Get trip event form offers template.
   *
   * @return {string}
   *
   * @private
   */
  _getOffersTemplate() {
    return [...this._event.offers].map((offer) => {
      const [code, data] = offer;

      return (
        `<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden"
                 id="event-offer-${code}-1"
                 type="checkbox"
                 name="event-offer-${code}"
                 ${data.isChecked ? `checked` : ``}
          >
          <label class="event__offer-label" for="event-offer-${code}-1">
            <span class="event__offer-title">${data.title}</span>
            &plus;
            &euro;&nbsp;<span class="event__offer-price">${data.price}</span>
          </label>
        </div>`
      );
    }).join(`\n`);
  }

  /**
   * Get event type options template.
   *
   * @param {Array} options
   *
   * @return {string}
   *
   * @private
   */
  _getTypeOptionsTemplate(options) {
    return options.map((option) => {
      return (
        `<div class="event__type-item">
        <input id="event-type-${option.code}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${option.code}">
        <label class="event__type-label  event__type-label--${option.code}" for="event-type-${option.code}-1">${capitalize(option.code)}</label>
      </div>`
      );
    }).join(`\n`);
  }

  /**
   * Get location options template
   *
   * @return {string}
   *
   * @private
   */
  _getLocationsTemplate() {
    return LOCATIONS.map((location) => `<option value="${location.name}"></option>`).join(`\n`);
  }

  /**
   * Get photos template
   *
   * @return {string}
   *
   * @private
   */
  _getPhotosTemplate() {
    return this._event.attractionImages
      .map((photo) => `<img class="event__photo" src="${photo}" alt="Event photo">`).join(`\n`);
  }

}
