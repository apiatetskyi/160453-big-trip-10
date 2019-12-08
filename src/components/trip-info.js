import moment from 'moment';

/**
 * Get HTML string template for trip info.
 *
 * @param {Array} events
 *
 * @return {string}
 */
export const getTripInfoTemplate = (events) => {
  const tripDateStart = moment(events[0].dateStart);
  const tripDateEnd = moment(events[events.length - 1].dateEnd);
  const tripData = tripDateStart.format(`MMM`) === tripDateEnd.format(`MMM`)
    ? `${tripDateStart.format(`MMM`).toUpperCase()} ${tripDateStart.format(`DD`)}&nbsp;&mdash;&nbsp;${tripDateEnd.format(`DD`)}`
    : ``;
  const cities = events.filter((event) => event.location.type === `city`).map((event) => event.location);
  const totalPrice = events.reduce((sum, event) => {
    const offersTotal = [...event.offers]
      .filter((offer) => offer[1].isChecked)
      .reduce((offersSum, offer) => {
        return offersSum + offer[1].price;
      }, 0);

    return sum + event.price + offersTotal;
  }, 0);
  const tripRoute = cities.length > 3
    ? `${cities[0].name} &mdash; ... &mdash; ${cities[cities.length - 1].name}`
    : cities.map((city) => city.name).join(` &mdash; `);

  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${tripRoute}</h1>

        <p class="trip-info__dates">${tripData}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
      </p>
    </section>`
  );
};
