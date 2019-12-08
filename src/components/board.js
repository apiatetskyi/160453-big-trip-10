import {createElement} from '../utils';

/**
 * Class representing trip board.
 */
export default class Board {

  /**
   * Create a board.
   *
   * @param {Array} events
   */
  constructor(events) {
    this._element = null;
    this._events = events;
  }

  /**
   * Get reference to board element.
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
   * Get string template for board.
   *
   * @return {string}
   */
  getTemplate() {
    return `<ul class="trip-days"></ul>`;
  }
}
