import BaseComponent from '../base/base-component';

/**
 * Class representing trip filter.
 *
 * @class FilterComponent
 * @extends BaseComponent
 */
export default class FilterComponent extends BaseComponent {

  /**
   * Create a filter.
   *
   * @param {Array} filter
   */
  constructor(filter) {
    super();

    this._filter = filter;
  }

  /**
   * Get string template for filter.
   *
   * @return {string}
   */
  getTemplate() {
    const filtersTemplate = this._filter.map((filter) => {
      return (
        `<div class="trip-filters__filter">
          <input id="filter-${filter.title.toLowerCase()}"
                 class="trip-filters__filter-input  visually-hidden"
                 type="radio"
                 name="trip-filter"
                 value="${filter.title.toLowerCase()}"
                 ${filter.isChecked ? `checked` : ``}
          >
          <label class="trip-filters__filter-label" for="filter-${filter.title.toLowerCase()}">${filter.title}</label>
        </div>`
      );
    }).join(`\n`);

    return (
      `<form class="trip-filters" action="#" method="get">
        ${filtersTemplate}
        <button class="visually-hidden" type="submit">Accept filter</button>
      </form>`
    );
  }
}
