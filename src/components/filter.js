/**
 * Get HTML string template for filter.
 *
 * @param {Array} filters
 *
 * @return {string}
 */
export const getFilterTemplate = (filters) => {
  const filtersTemplate = filters.reduce((template, filter) => {
    return (
      `${template}
      <div class="trip-filters__filter">
        <input id="filter-${filter.title.toLowerCase()}"
               class="trip-filters__filter-input  visually-hidden"
               type="radio"
               name="trip-filter"
               value="${filter.title.toLowerCase()}"
               ${filter.isChecked && `checked`}
        >
        <label class="trip-filters__filter-label" for="filter-${filter.title.toLowerCase()}">${filter.title}</label>
      </div>`
    );
  }, ``);

  return (
    `<form class="trip-filters" action="#" method="get">
      ${filtersTemplate}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};
