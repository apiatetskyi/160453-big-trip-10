import {getBoardTemplate} from './components/board';
import {getEventTemplate} from './components/event';
import {getEventFormTemplate} from './components/event-form';
import {getFilterTemplate} from './components/filter';
import {getMenuTemplate} from './components/menu';
import {getSortingTemplate} from './components/sorting';
import {getTripInfoTemplate} from './components/trip-info';
import {render} from './utils';

const EVENTS_AMOUNT = 4;

const tripHeaderElement = document.querySelector(`.trip-main`);
const tripControlsElement = document.querySelector(`.trip-controls`);
const tripEventsElement = document.querySelector(`.trip-events`);

render(tripHeaderElement, getTripInfoTemplate(), `afterbegin`);
render(tripControlsElement.children[0], getMenuTemplate(), `afterend`);
render(tripControlsElement.children[1], getFilterTemplate(), `afterend`);
render(tripEventsElement, getSortingTemplate());
render(tripEventsElement, getBoardTemplate());

const dayEventsElement = tripEventsElement.querySelector(`.trip-events__list`);

new Array(EVENTS_AMOUNT)
  .fill(``)
  .forEach((event, index) => {
    if (index === 0) {
      render(dayEventsElement, getEventFormTemplate());
    } else {
      render(dayEventsElement, getEventTemplate());
    }
  });
