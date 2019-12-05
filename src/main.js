import {getBoardTemplate} from './components/board';
import {getFilterTemplate} from './components/filter';
import {getMenuTemplate} from './components/menu';
import {getSortingTemplate} from './components/sorting';
import {getTripInfoTemplate} from './components/trip-info';
import {getEvents, groupEventsByDays} from './mock/event';
import {render} from './utils';

const EVENTS_AMOUNT = 20;
const tripHeaderElement = document.querySelector(`.trip-main`);
const tripControlsElement = document.querySelector(`.trip-controls`);
const tripEventsElement = document.querySelector(`.trip-events`);

render(tripHeaderElement, getTripInfoTemplate(), `afterbegin`);
render(tripControlsElement.children[0], getMenuTemplate(), `afterend`);
render(tripControlsElement.children[1], getFilterTemplate(), `afterend`);
render(tripEventsElement, getSortingTemplate());

const events = getEvents(EVENTS_AMOUNT);

render(tripEventsElement, getBoardTemplate(groupEventsByDays(events)));
