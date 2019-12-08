import moment from 'moment';
import {createElement} from '../utils';
import {getEventTemplate} from './event';
import {getEventFormTemplate} from './event-form';

/**
 * Class representing trip day.
 */
export default class TripDay {

  /**
   * Create a trip day.
   *
   * @param {number} timestamp
   * @param {Array} events
   * @param {number} counter
   */
  constructor(timestamp, events, counter) {
    this._element = null;
    this._counter = counter;
    this._timestamp = timestamp;
    this._events = events;
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
   * Get string template for trip day.
   *
   * @return {string}
   */
  getTemplate() {
    const eventsTemplate = this._events.map((event, index) => {
      return this._counter === 1 && index === 0
        ? getEventFormTemplate(event)
        : getEventTemplate(event);
    }).join(`\n`);

    return (
      `<li class="trip-days__item  day">
        <div class="day__info">
          <span class="day__counter">${this._counter}</span>
          <time class="day__date" datetime="${moment(this._timestamp).format(`YYYY-MM-DD`)}">${moment(this._timestamp).format(`MMM DD`)}</time>
        </div>
  
        <ul class="trip-events__list">${eventsTemplate}</ul>
      </li>`
    );
  }
}
