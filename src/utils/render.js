import BaseComponent from '../base/base-component';

/**
 * Enum for render position.
 *
 * @readonly
 * @enum {string}
 */
const RenderPositionEnum = Object.freeze({
  AFTER_BEGIN: `afterbegin`,
  AFTER_END: `afterend`,
  BEFORE_END: `beforeend`,
});

/**
 * Create HTMLElement from template string.
 *
 * @param {string} template
 *
 * @return {HTMLElement}
 */
const createElement = (template) => document.createRange().createContextualFragment(template).firstChild;

/**
 * Render HTML string to container.
 *
 * @param {HTMLElement|BaseComponent} container
 * @param {BaseComponent} component
 * @param {string} [position=beforeend]
 */
const render = (container, component, position = RenderPositionEnum.BEFORE_END) => {
  if (container instanceof BaseComponent) {
    container.getElement().insertAdjacentElement(position, component.getElement());
  } else {
    container.insertAdjacentElement(position, component.getElement());
  }
};

/**
 * Remove component from DOM.
 *
 * @param {BaseComponent} component
 */
const remove = (component) => {
  const componentElement = component.getElement();

  componentElement.parentElement.removeChild(componentElement);
  component.removeElement();
};

/**
 * Replace old component to new component.
 *
 * @param {BaseComponent} newComponent
 * @param {BaseComponent} oldComponent
 */
const replace = (newComponent, oldComponent) => {
  const oldElement = oldComponent.getElement();
  const newElement = newComponent.getElement();
  const parentElement = oldElement.parentElement;

  const isAllElementsExist = !!(oldElement && newElement && parentElement);

  if (isAllElementsExist && parentElement.contains(oldElement)) {
    parentElement.replaceChild(newElement, oldElement);
  }
};

export {
  createElement,
  render,
  remove,
  replace,
  RenderPositionEnum,
};
