import {createElement} from '../utils';

export default class Menu {

  /**
   * Create a menu.
   *
   * @param {Array} menu
   */
  constructor(menu) {
    this._element = null;
    this._menu = menu;
  }

  /**
   * Get reference to filter element.
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
   * Remove reference to filter element.
   */
  removeElement() {
    this._element = null;
  }

  /**
   * Get string template for filter.
   *
   * @return {string}
   */
  getTemplate() {
    const items = this._menu.map((item) => {
      return `<a class="trip-tabs__btn ${item.isChecked && `trip-tabs__btn--active`}" href="#">${item.title}</a>`;
    }).join(`\n`);

    return `<nav class="trip-controls__trip-tabs  trip-tabs">${items}</nav>`;
  }
}
