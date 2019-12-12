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
    this._handlers = [];
    this._isHandlersBind = false;
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

    this.unbindHandlers();
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
   * Bind component event handlers.
   */
  bindHandlers() {
    if (!this._isHandlersBind) {
      this._handlers.forEach((handler) => {
        const {element, eventType, callback} = handler;

        if (element && eventType && callback) {
          element.addEventListener(eventType, callback);
        }
      });

      this._isHandlersBind = true;
    }
  }

  /**
   * Unbind component event handlers.
   */
  unbindHandlers() {
    if (this._isHandlersBind) {
      this._handlers.forEach((handler) => {
        const {element, eventType, callback} = handler;

        if (element && eventType && callback) {
          element.removeEventListener(eventType, callback);
        }
      });

      this._isHandlersBind = false;
    }
  }

  /**
   * Add handler to component.
   *
   * @param {HTMLElement|string} selector
   * @param {string} eventType
   * @param {function} callback
   */
  addHandler(selector, eventType, callback) {
    let elements = null;

    if (typeof selector === `string`) {
      elements = this.getElement().querySelectorAll(selector);
    } else if (selector instanceof Node) {
      elements = [selector];
    }

    elements.forEach((element) => {
      this._handlers.push({element, eventType, callback});
    });
  }
}
