import BaseComponent from '../base/base-component';

/**
 * Class representing trip board.
 *
 * @class BoardComponent
 * @extends BaseComponent
 */
export default class BoardComponent extends BaseComponent {

  /**
   * Get string template for board.
   *
   * @return {string}
   */
  getTemplate() {
    return (
      `<section class="trip-events">
        <h2 class="visually-hidden">Trip events</h2>
        <ul class="trip-days"></ul>
      </section>`
    );
  }

  /**
   * Find container for trip days.
   *
   * @return {HTMLElement}
   */
  get tripDaysElement() {
    return this.getElement().querySelector(`.trip-days`);
  }
}
