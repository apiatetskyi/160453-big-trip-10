import BaseComponent from '../base/base-component';
import {RenderPosition} from '../mock/consts';

/**
 * Render HTML string to container.
 *
 * @param {HTMLElement|BaseComponent} container
 * @param {BaseComponent} component
 * @param {string} [position=beforeend]
 */
const render = (container, component, position = RenderPosition.BEFORE_END) => {
  if (container instanceof BaseComponent) {
    container.getElement().insertAdjacentElement(position, component.getElement());
  } else {
    container.insertAdjacentElement(position, component.getElement());
  }
};

/**
 * Create HTMLElement from template string.
 *
 * @param {string} template
 *
 * @return {HTMLElement}
 */
const createElement = (template) => document.createRange().createContextualFragment(template).firstChild;

export {render, createElement};
