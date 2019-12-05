import {getBoardTemplate} from './components/board';
import {getFilterTemplate} from './components/filter';
import {getMenuTemplate} from './components/menu';
import {getSortingTemplate} from './components/sorting';
import {getTripInfoTemplate} from './components/trip-info';
import {getEvents, groupEventsByDays} from './mock/event';
import {getMenu} from './mock/menu';
import {getFilter} from './mock/filter';
import {render} from './utils';

const EVENTS_AMOUNT = 10;
const tripHeaderElement = document.querySelector(`.trip-main`);
const tripControlsElement = document.querySelector(`.trip-controls`);
const tripEventsElement = document.querySelector(`.trip-events`);
const events = getEvents(EVENTS_AMOUNT).sort((current, next) => current.dateStart - next.dateStart);

render(tripHeaderElement, getTripInfoTemplate(events), `afterbegin`);
render(tripControlsElement.children[0], getMenuTemplate(getMenu()), `afterend`);
render(tripControlsElement.children[1], getFilterTemplate(getFilter()), `afterend`);
render(tripEventsElement, getSortingTemplate());
render(tripEventsElement, getBoardTemplate(groupEventsByDays(events)));
