import moment from 'moment';
import BaseComponent from '../base/component';

/**
 * Class representing trip day.
 *
 * @class TripDayComponent
 * @extends BaseComponent
 */
export default class TripDayComponent extends BaseComponent {

  /**
   * Create a trip day.
   *
   * @param {number} timestamp
   * @param {number} counter
   * @param {boolean} showInfo
   */
  constructor(timestamp, counter, showInfo = true) {
    super();

    this._counter = counter;
    this._timestamp = timestamp;
    this._showInfo = showInfo;
  }

  /**
   * Get string template for trip day.
   *
   * @return {string}
   */
  getTemplate() {
    return (
      `<li class="trip-days__item  day">
        <div class="day__info">${this._getDayInfoTemplate()}</div>

        <ul class="trip-events__list"></ul>
      </li>`
    );
  }

  /**
   * Get day info template.
   *
   * @return {string}
   *
   * @private
   */
  _getDayInfoTemplate() {
    return this._showInfo
      ? `<span class="day__counter">${this._counter}</span>
        <time class="day__date" datetime="${moment(this._timestamp).format(`YYYY-MM-DD`)}">
          ${moment(this._timestamp).format(`MMM DD`)}
        </time>`
      : ``;
  }
}
