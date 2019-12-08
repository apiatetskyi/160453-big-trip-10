import moment from 'moment';
import {createElement} from '../utils';

/**
 * Class representing trip day.
 */
export default class TripDay {

  /**
   * Create a trip day.
   *
   * @param {number} timestamp
   * @param {number} counter
   */
  constructor(timestamp, counter) {
    this._element = null;
    this._counter = counter;
    this._timestamp = timestamp;
  }

  /**
   * Get reference to trip day element.
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
   * Remove reference to trip day element.
   */
  removeElement() {
    this._element = null;
  }

  /**
   * Get string template for trip day.
   *
   * @return {string}
   */
  getTemplate() {
    return (
      `<li class="trip-days__item  day">
        <div class="day__info">
          <span class="day__counter">${this._counter}</span>
          <time class="day__date" datetime="${moment(this._timestamp).format(`YYYY-MM-DD`)}">${moment(this._timestamp).format(`MMM DD`)}</time>
        </div>
  
        <ul class="trip-events__list"></ul>
      </li>`
    );
  }
}
