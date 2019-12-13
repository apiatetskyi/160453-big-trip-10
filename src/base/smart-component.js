import BaseComponent from './component';
import {remove} from '../utils/render';

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
   * Update view of component.
   */
  update() {
    remove(this);
    this.getElement();
    this.bindHandlers();
  }
}
