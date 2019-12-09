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
import {RenderPosition, KeyboardEnum} from './mock/consts';

const EVENTS_AMOUNT = 10;

/**
 * Render trip event and event form. Handle toggling between them.
 *
 * @param {HTMLElement} parentElement
 * @param {Object} event
 */
const renderEvent = (parentElement, event) => {
  const eventComponent = new Event(event);
  const eventFormComponent = new EventForm(event);
  const editEventButton = eventComponent.getElement().querySelector(`.event__rollup-btn`);
  const eventFormElement = eventFormComponent.getElement().querySelector(`.event--edit`);

  /**
   * Escape key press handler.
   *
   * @param {KeyboardEvent} evt
   */
  const escapeKeyDownHandler = (evt) => {
    if (evt.key === KeyboardEnum.ESC || evt.key === KeyboardEnum.ESCAPE) {
      toggleEventForm();

      document.removeEventListener(`keydown`, escapeKeyDownHandler);
    }
  };

  /**
   * Toggle event and event form components.
   */
  const toggleEventForm = () => {
    if (parentElement.contains(eventComponent.getElement())) {
      parentElement.replaceChild(eventFormComponent.getElement(), eventComponent.getElement());
    } else {
      parentElement.replaceChild(eventComponent.getElement(), eventFormComponent.getElement());
    }
  };

  editEventButton.addEventListener(`click`, () => {
    toggleEventForm();
    document.addEventListener(`keydown`, escapeKeyDownHandler);
  });

  eventFormElement.addEventListener(`submit`, () => {
    toggleEventForm();
  });

  render(parentElement, eventComponent.getElement());
};

const tripHeaderElement = document.querySelector(`.trip-main`);
const tripControlsElement = document.querySelector(`.trip-controls`);
const tripEventsElement = document.querySelector(`.trip-events`);
const events = getEvents(EVENTS_AMOUNT).sort((current, next) => current.dateStart - next.dateStart);

const tripInfoComponent = new TripInfo(events);
const menuComponent = new Menu(getMenu());
const filterComponent = new Filter(getFilter());
const sortingComponent = new Sorting();
const boardComponent = new Board(events);

render(tripHeaderElement, tripInfoComponent.getElement(), RenderPosition.AFTER_BEGIN);
render(tripControlsElement.children[0], menuComponent.getElement(), RenderPosition.AFTER_END);
render(tripControlsElement.children[1], filterComponent.getElement(), RenderPosition.AFTER_END);
render(tripEventsElement, boardComponent.getElement());
render(tripEventsElement, sortingComponent.getElement());

[...groupEventsByDays(events)].forEach((day, index) => {
  const [dayTimestamp, dayEvents] = day;
  const tripDay = new TripDay(dayTimestamp, index + 1);
  const eventsElement = tripDay.getElement().querySelector(`.trip-events__list`);

  dayEvents.forEach((event) => {
    renderEvent(eventsElement, event);
  });

  render(boardComponent.getElement(), tripDay.getElement());
});
