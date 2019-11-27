/**
 * Render HTML string to container
 *
 * @param {HTMLElement} container
 * @param {string} template
 * @param {string} [position=beforeEnd]
 */
export const render = (container, template, position = `beforeEnd`) => {
  container.insertAdjacentHTML(position, template);
};
