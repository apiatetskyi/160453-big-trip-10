import moment from 'moment';
import {getEventTemplate} from './event';
import {getEventFormTemplate} from './event-form';

/**
 * Get HTML string template for trip days.
 *
 * @param {Map} days
 * @return {string}
 */
export const getBoardTemplate = (days) => {
  let daysTemplate = ``;

  for (let [, day] of days) {
    let eventsTemplate = ``;
    let events = day.events.slice();

    if (day.counter === 0) {
      eventsTemplate = getEventFormTemplate(events[0]);
      events = events.slice(1);
    }

    eventsTemplate += events.reduce((template, event) => template + getEventTemplate(event), ``);

    daysTemplate += (
      `<li class="trip-days__item  day">
        <div class="day__info">
          <span class="day__counter">${day.counter + 1}</span>
          <time class="day__date" datetime="${moment(day.date).format(`YYYY-MM-DD`)}">${moment(day.date).format(`MMM DD`)}</time>
        </div>
  
        <ul class="trip-events__list">${eventsTemplate}</ul>
      </li>`
    );
  }

  return (
    `<ul class="trip-days">
      ${daysTemplate}
    </ul>`
  );
};
