import moment from 'moment';
import {createElement} from '../utils';

/**
 * Class representing trip info.
 */
export default class TripInfo {

  /**
   * Create a trip info.
   *
   * @param {Array} events
   */
  constructor(events) {
    this._events = events;
  }

  get dateStart() {
    return this._events[0].dateStart;
  }

  set dateStart(value) {
    throw new Error(`This is readonly property.`);
  }

  get dateEnd() {
    return this._events[this._events.length - 1].dateEnd;
  }

  set dateEnd(value) {
    throw new Error(`This is readonly property.`);
  }

  /**
   * Get reference to trip info element.
   *
   * @return {HTMLElement}
   */
  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  /**
   * Remove reference to trip info element.
   */
  removeElement() {
    this._element = null;
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
    const dateStart = moment(this.dateStart);
    const dateEnd = moment(this.dateEnd);

    return dateStart.format(`MMM`) === dateEnd.format(`MMM`)
      ? `${dateStart.format(`MMM`).toUpperCase()} ${dateStart.format(`DD`)} &nbsp;&mdash;&nbsp; ${dateEnd.format(`DD`)}`
      : ``;
  }

  /**
   * Get template for trip route.
   *
   * @return {string}
   *
   * @private
   */
  _getRouteTemplate() {
    const cities = this._events.filter((event) => event.location.type === `city`).map((event) => event.location);

    return cities.length > 3
      ? `${cities[0].name} &mdash; ... &mdash; ${cities[cities.length - 1].name}`
      : cities.map((city) => city.name).join(` &mdash; `);
  }

  /**
   * Get trip total price.
   *
   * @return {number}
   *
   * @private
   */
  _getPrice() {
    return this._events.reduce((sum, event) => {
      const offersTotal = [...event.offers]
        .filter((offer) => offer[1].isChecked)
        .reduce((offersSum, offer) => {
          return offersSum + offer[1].price;
        }, 0);

      return sum + event.price + offersTotal;
    }, 0);
  }

}
