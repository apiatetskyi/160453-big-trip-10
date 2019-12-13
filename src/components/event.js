import moment from 'moment';
import BaseComponent from '../base/component';
import {capitalize, getEventDurationString, getEventPlaceholder} from '../utils/common';

/**
 * Representing trip event class.
 *
 * @class EventComponent
 * @extends BaseComponent
 */
export default class EventComponent extends BaseComponent {

  /**
   * Create a trip event.
   *
   * @param {Object} event
   */
  constructor(event) {
    super();

    this._event = event;
  }

  /**
   * Setter for component editing.
   *
   * @param {Function} callback
   */
  set onEdit(callback) {
    this.addHandler(`.event__rollup-btn`, `click`, callback);
  }

  /**
   * Get string template for trip event.
   *
   * @return {string}
   */
  getTemplate() {
    const dateStart = moment(this._event.dateStart).format(`HH:mm`);
    const dateStartISO = moment(this._event.dateStart).toISOString();
    const dateEnd = moment(this._event.dateEnd).format(`HH:mm`);
    const dateEndISO = moment(this._event.dateEnd).toISOString();
    const diff = this._event.dateEnd - this._event.dateStart;

    return (
      `<li class="trip-events__item">
        <div class="event">
          <div class="event__type">
            <img class="event__type-icon" width="42" height="42" src="img/icons/${this._event.type.code}.png" alt="Event type icon">
          </div>
          <h3 class="event__title">${capitalize(this._event.type.code)} ${getEventPlaceholder(this._event.type)} ${this._event.currentLocation.name}</h3>
  
          <div class="event__schedule">
            <p class="event__time">
              <time class="event__start-time" datetime="${dateStartISO}">${dateStart}</time>
              &mdash;
              <time class="event__end-time" datetime="${dateEndISO}">${dateEnd}</time>
            </p>
            <p class="event__duration">${getEventDurationString(diff)}</p>
          </div>
  
          <p class="event__price">
            &euro;&nbsp;<span class="event__price-value">${this._event.price}</span>
          </p>
  
          <h4 class="visually-hidden">Offers:</h4>
          <ul class="event__selected-offers">
            ${this._getOffersTemplate()}
          </ul>
  
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </div>
      </li>`
    );
  }

  /**
   * Get trip event offers template.
   *
   * @return {string}
   *
   * @private
   */
  _getOffersTemplate() {
    return [...this._event.offers].filter((offer) => offer[1].isChecked).slice(0, 2)
      .map((offer) => {
        const [code, data] = offer;

        return (
          `<li class="event__offer">
          <span class="event__offer-title">${capitalize(code)}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${data.price}</span>
        </li>`
        );
      }). join(`\n`);
  }
}
