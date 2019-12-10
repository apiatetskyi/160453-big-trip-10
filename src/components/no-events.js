import BaseComponent from '../base/base-component';

/**
 * Class representing no events placeholder.
 *
 * @class NoEventsComponent
 * @extends BaseComponent
 */
export default class NoEventsComponent extends BaseComponent {

  /**
   * Get string template for no events placeholder.
   *
   * @return {string}
   */
  getTemplate() {
    return `<p class="trip-events__msg">Click New Event to create your first point</p>`;
  }
}
