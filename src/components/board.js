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
        </section>`
    );
  }
}
