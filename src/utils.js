/**
 * Render HTML string to container.
 *
 * @param {HTMLElement} container
 * @param {string} template
 * @param {string} [position=beforeEnd]
 */
export const render = (container, template, position = `beforeEnd`) => {
  container.insertAdjacentHTML(position, template);
};

/**
 * @param {Array} array
 *
 * @return {array}
 */
export const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};

/**
 * @return {string}
 */
export const getRandomDescription = () => {
  const template = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

  return shuffleArray(template.split(`.`).map((sentence) => sentence.trim()))
      .slice(0, getRandomNumber(1, 2))
      .join(`. `)
      .concat(`.`);
};

/**
 * Get random number in range.
 *
 * @param {number} [min=0]
 * @param {number} [max=10]
 *
 * @return {number}
 */
export const getRandomNumber = (min = 0, max = 10) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Capitalize first latter.
 *
 * @param {string} string
 *
 * @return {string}
 */
export const capitalize = (string) => {
  return typeof string !== `string` ?
    `` :
    string.charAt(0).toUpperCase() + string.slice(1);
};

/**
 * Round number to passed step.
 *
 * @param {number} value
 * @param {number} step
 *
 * @return {number}
 */
export const roundToStep = (value, step = 10) => Math.round(value / step) * step;
