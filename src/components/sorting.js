import BaseComponent from '../base/component';

/**
 * Enum for sorting types.
 *
 * @enum {string}
 */
export const SortType = {
  DEFAULT: `events`,
  DURATION: `time`,
  PRICE: `price`,
};

/**
 * Class representing trip sorting.
 *
 * @class SortingComponent
 * @extends BaseComponent
 */
export default class SortingComponent extends BaseComponent {

  /**
   * Create a sorting.
   */
  constructor() {
    super();

    this._currentSorting = SortType.DEFAULT;
  }

  /**
   * Setter for sorting activation.
   *
   * @param {Function} handler
   */
  set onButtonClick(handler) {
    this.registerObserver(`.trip-sort__input`, `click`, (evt) => {
      if (this._currentSorting === evt.target.dataset.sortType) {
        return;
      }

      this._currentSorting = evt.target.dataset.sortType;
      this._toggleDayInfoColumnTitle();
      handler(evt);
    }, true);
  }

  /**
   * Get string template for sorting.
   *
   * @return {string}
   */
  getTemplate() {
    return (
      `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
        <span class="trip-sort__item  trip-sort__item--day">Day</span>
        ${this._getSortingButtonsTemplate()}
        <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
      </form>`
    );
  }

  /**
   * Get sorting buttons template.
   *
   * @return {string}
   *
   * @private
   */
  _getSortingButtonsTemplate() {
    return Object.values(SortType).map((type) => {
      return (
        `<div class="trip-sort__item  trip-sort__item--price">
          <input id="sort-${type}"
                 class="trip-sort__input  visually-hidden"
                 type="radio"
                 name="trip-sort"
                 value="sort-${type}"
                 data-sort-type="${type}"
                 ${this._currentSorting === type ? `checked` : ``}
          >
          <label class="trip-sort__btn" for="sort-${type}">
            ${type.toUpperCase()}
            <svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
              <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
            </svg>
          </label>
        </div>`
      );
    }).join(`\n`);
  }

  /**
   * Show or hide day column title, depends on sorting type.
   *
   * @private
   */
  _toggleDayInfoColumnTitle() {
    const dayColumnTitle = this.getElement().querySelector(`.trip-sort__item--day`);

    if (this._currentSorting !== SortType.DEFAULT) {
      dayColumnTitle.textContent = ``;
    } else {
      dayColumnTitle.textContent = `Day`;
    }
  }
}
