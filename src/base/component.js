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
    this._observers = [];
  }

  /**
   * Get reference to component element.
   *
   * @return {HTMLElement}
   */
  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
      this._subscribeObservers();
    }

    return this._element;
  }

  /**
   * Remove reference to component element.
   */
  removeElement() {
    this._unSubscribeObservers();
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

  /**
   * Update observers subscription to the component events.
   *
   * @private
   */
  _subscribeObservers() {
    this._observers.forEach((handler) => {
      const {selector, eventType, callback, selectAll} = handler;

      if (selectAll) {
        this.getElement().querySelectorAll(selector).forEach((element) => {
          element.addEventListener(eventType, callback);
        });
      } else {
        this.getElement().querySelector(selector).addEventListener(eventType, callback);
      }
    });
  }

  /**
   * Unsubscribe observers for component events.
   *
   * @private
   */
  _unSubscribeObservers() {
    this._observers.forEach((handler) => {
      const {selector, eventType, callback, selectAll} = handler;

      if (selectAll) {
        this.getElement().querySelectorAll(selector).forEach((element) => {
          element.removeElement(eventType, callback);
        });
      } else {
        this.getElement().querySelector(selector).addEventListener(eventType, callback);
      }
    });
  }

  /**
   * Add observer to the component.
   *
   * @param {string} selector
   * @param {string} eventType
   * @param {function} callback
   * @param {Boolean} selectAll
   */
  registerObserver(selector, eventType, callback, selectAll = false) {
    if (!(selector && eventType && callback)) {
      throw new Error(`You should pass all parameters`);
    }

    this._observers.push({selector, eventType, callback, selectAll});

    if (selectAll) {
      this.getElement().querySelectorAll(selector).forEach((element) => {
        element.addEventListener(eventType, callback);
      });
    } else {
      this.getElement().querySelector(selector).addEventListener(eventType, callback);
    }
  }
}
