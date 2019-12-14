import BaseComponent from './component';

/**
 * Representing base component interface.
 *
 * @abstract
 * @class BaseSmartComponent
 * @extends BaseComponent
 */
export default class BaseSmartComponent extends BaseComponent {

  /**
   * Create a base smart component instance.
   */
  constructor() {
    super();

    if (new.target === BaseSmartComponent) {
      throw new TypeError(`Cannot construct Abstract instances directly`);
    }
  }

  /**
   * Get string template for component.
   *
   * @abstract
   *
   * @return {string}
   */
  getTemplate() {
    throw new Error(`You have to implement the method getTemplate!`);
  }

  /**
   * Update view of component.
   */
  update() {
    const oldElement = this.getElement();
    const parent = oldElement.parentElement;

    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, oldElement);
    this.updateEventListeners();
  }
}
