/**
 * @param {Array} menu
 *
 * @return {string}
 */
export const getMenuTemplate = (menu) => {
  const items = menu.map((item) => {
    return `<a class="trip-tabs__btn ${item.isChecked && `trip-tabs__btn--active`}" href="#">${item.title}</a>`;
  }).join(`\n`);

  return `<nav class="trip-controls__trip-tabs  trip-tabs">${items}</nav>`;
};
