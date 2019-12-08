import {render, groupEventsByDays} from './utils';

import Board from './components/board';
import TripDay from './components/trip-day';
import TripInfo from './components/trip-info';
import Sorting from './components/sorting';
import Filter from './components/filter';
import Menu from './components/menu';
import Event from './components/event';
import EventForm from './components/event-form';

import {getEvents} from './mock/event';
import {getMenu} from './mock/menu';
import {getFilter} from './mock/filter';
import {RenderPosition} from './mock/consts';

const EVENTS_AMOUNT = 10;

const tripHeaderElement = document.querySelector(`.trip-main`);
const tripControlsElement = document.querySelector(`.trip-controls`);
const tripEventsElement = document.querySelector(`.trip-events`);
const events = getEvents(EVENTS_AMOUNT).sort((current, next) => current.dateStart - next.dateStart);

const tripInfo = new TripInfo(events);
const menu = new Menu(getMenu());
const filter = new Filter(getFilter());
const sorting = new Sorting();
const board = new Board(events);

render(tripHeaderElement, tripInfo.getElement(), RenderPosition.AFTER_BEGIN);
render(tripControlsElement.children[0], menu.getElement(), RenderPosition.AFTER_END);
render(tripControlsElement.children[1], filter.getElement(), RenderPosition.AFTER_END);
render(tripEventsElement, board.getElement());
render(tripEventsElement, sorting.getElement());

[...groupEventsByDays(events)].forEach((day, index) => {
  const [dayTimestamp, dayEvents] = day;
  const tripDay = new TripDay(dayTimestamp, index + 1);
  const eventsElement = tripDay.getElement().querySelector(`.trip-events__list`);

  // TODO: remove `data` from variable name
  dayEvents.forEach((eventData) => {
    const event = new Event(eventData);
    const eventForm = new EventForm(eventData);
    const editEventButton = event.getElement().querySelector(`.event__rollup-btn`);
    const eventFormElement = eventForm.getElement().querySelector(`.event--edit`);

    editEventButton.addEventListener(`click`, () => {
      eventsElement.replaceChild(eventForm.getElement(), event.getElement());
    });

    eventFormElement.addEventListener(`submit`, () => {
      eventsElement.replaceChild(event.getElement(), eventForm.getElement());
    });

    render(eventsElement, event.getElement());
  });

  render(board.getElement(), tripDay.getElement());
});
