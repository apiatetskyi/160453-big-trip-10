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
  let counter = 1;

  for (let [dayTimestamp, events] of days) {
    let eventsTemplate = ``;
    let eventsCopy = events.slice();

    if (counter === 1) {
      eventsTemplate = getEventFormTemplate(events[0]);
      eventsCopy = events.slice(1);
    }

    eventsTemplate += eventsCopy.map((event) => getEventTemplate(event)).join(`\n`);

    daysTemplate += (
      `<li class="trip-days__item  day">
        <div class="day__info">
          <span class="day__counter">${counter}</span>
          <time class="day__date" datetime="${moment(dayTimestamp).format(`YYYY-MM-DD`)}">${moment(dayTimestamp).format(`MMM DD`)}</time>
        </div>
  
        <ul class="trip-events__list">${eventsTemplate}</ul>
      </li>`
    );

    counter++;
  }

  return (
    `<ul class="trip-days">
      ${daysTemplate}
    </ul>`
  );
};
