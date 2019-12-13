import moment from 'moment';
import BaseComponent from '../base/component';
import {calculateEventTotalPrice} from '../utils/common';

const SETTER_ERROR_MESSAGE = `This is readonly property.`;

/**
 * Class representing trip info.
 *
 * @class TripInfoComponent
 * @extends BaseComponent
 */
export default class TripInfoComponent extends BaseComponent {

  /**
   * Create a trip info.
   *
   * @param {Array} events
   */
  constructor(events) {
    super();

    this._events = events;
  }

  get dateStart() {
    return this._events[0].dateStart;
  }

  set dateStart(value) {
    throw new Error(SETTER_ERROR_MESSAGE);
  }

  get dateEnd() {
    return this._events[this._events.length - 1].dateEnd;
  }

  set dateEnd(value) {
    throw new Error(SETTER_ERROR_MESSAGE);
  }

  /**
   * Get string template for trip info.
   *
   * @return {string}
   */
  getTemplate() {
    return (
      `<section class="trip-main__trip-info  trip-info">
        <div class="trip-info__main">
          <h1 class="trip-info__title">${this._getRouteTemplate()}</h1>
          <p class="trip-info__dates">${this._getPeriodTemplate()}</p>
        </div>
        <p class="trip-info__cost">Total: &euro;&nbsp;<span class="trip-info__cost-value">${this._getPrice()}</span></p>
      </section>`
    );
  }

  /**
   * Get template for trip period.
   *
   * @return {string}
   *
   * @private
   */
  _getPeriodTemplate() {
    if (this._events.length) {
      const dateStart = moment(this.dateStart);
      const dateEnd = moment(this.dateEnd);

      return dateStart.format(`MMM`) === dateEnd.format(`MMM`)
        ? `${dateStart.format(`MMM`).toUpperCase()} ${dateStart.format(`DD`)} &nbsp;&mdash;&nbsp; ${dateEnd.format(`DD`)}`
        : ``;
    } else {
      return ``;
    }
  }

  /**
   * Get template for trip route.
   *
   * @return {string}
   *
   * @private
   */
  _getRouteTemplate() {
    if (this._events.length) {
      const cities = this._events.filter((event) => event.location.type === `city`).map((event) => event.location);

      return cities.length > 3
        ? `${cities[0].name} &mdash; ... &mdash; ${cities[cities.length - 1].name}`
        : cities.map((city) => city.name).join(` &mdash; `);
    } else {
      return ``;
    }
  }

  /**
   * Get trip total price.
   *
   * @return {number}
   *
   * @private
   */
  _getPrice() {
    return this._events
      ? this._events.reduce((sum, event) => sum + calculateEventTotalPrice(event), 0)
      : 0;
  }

}
