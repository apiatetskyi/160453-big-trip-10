import BaseComponent from '../base/component';

/**
 * Class representing menu.
 *
 * @class MenuComponent
 * @extends BaseComponent
 */
export default class MenuComponent extends BaseComponent {

  /**
   * Create a menu.
   *
   * @param {Array} menu
   */
  constructor(menu) {
    super();

    this._menu = menu;
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
