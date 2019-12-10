import {createElement} from '../utils';

/**
 * Representing no events placeholder
 */
export default class NoEvents {

  /**
   * Create a no events placeholder.
   */
  constructor() {
    this._element = null;
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
   * Remove reference to no events element.
   */
  removeElement() {
    this._element = null;
  }

  /**
   * Get string template for no events placeholder.
   *
   * @return {string}
   */
  getTemplate() {
    return `<p class="trip-events__msg">Click New Event to create your first point</p>`;
  }
}
