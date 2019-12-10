import {createElement} from '../utils/render';

/**
 * Representing base component interface.
 *
 * @abstract
 * @class BaseComponent
 */
export default class BaseComponent {

  /**
   * Create a base component instance.
   */
  constructor() {
    if (new.target === BaseComponent) {
      throw new TypeError(`Cannot construct Abstract instances directly`);
    }

    this._element = null;
  }

  /**
   * Get reference to component element.
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
   * Remove reference to component element.
   */
  removeElement() {
    this._element = null;
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
}
