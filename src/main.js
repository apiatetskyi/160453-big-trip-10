import {render, groupEventsByDays} from './utils';

import Board from './components/board';
import TripDay from './components/trip-day';
import TripInfo from './components/trip-info';

import {getFilterTemplate} from './components/filter';
import {getMenuTemplate} from './components/menu';
import {getSortingTemplate} from './components/sorting';

import {getEvents} from './mock/event';
import {getMenu} from './mock/menu';
import {getFilter} from './mock/filter';
import {RenderPosition} from './mock/consts';

const EVENTS_AMOUNT = 10;
const tripHeaderElement = document.querySelector(`.trip-main`);
const tripControlsElement = document.querySelector(`.trip-controls`);
const tripEventsElement = document.querySelector(`.trip-events`);
const events = getEvents(EVENTS_AMOUNT).sort((current, next) => current.dateStart - next.dateStart);

const board = new Board(events);
const tripInfo = new TripInfo(events);

render(tripHeaderElement, tripInfo.getElement(), RenderPosition.AFTER_BEGIN);
render(tripControlsElement.children[0], getMenuTemplate(getMenu()), RenderPosition.AFTER_END);
render(tripControlsElement.children[1], getFilterTemplate(getFilter()), RenderPosition.AFTER_END);
render(tripEventsElement, getSortingTemplate());
render(tripEventsElement, board.getElement());

[...groupEventsByDays(events)].forEach((day, index) => {
  const tripDay = new TripDay(...day, index + 1);

  render(board.getElement(), tripDay.getElement());
});
