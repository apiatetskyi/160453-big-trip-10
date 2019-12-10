import {render, groupEventsByDays} from './utils';

import BoardComponent from './components/board';
import TripDayComponent from './components/trip-day';
import TripInfoComponent from './components/trip-info';
import SortingComponent from './components/sorting';
import FilterComponent from './components/filter';
import MenuComponent from './components/menu';
import EventComponent from './components/event';
import EventFormComponent from './components/event-form';
import NoEventsComponent from './components/no-events';

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
  const eventComponent = new EventComponent(event);
  const eventFormComponent = new EventFormComponent(event);
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

  render(parentElement, eventComponent);
};

const tripHeaderElement = document.querySelector(`.trip-main`);
const tripControlsElement = document.querySelector(`.trip-controls`);
const tripContainerElement = document.querySelector(`.page-main .page-body__container`);
const events = getEvents(EVENTS_AMOUNT).sort((current, next) => current.dateStart - next.dateStart);

const tripInfoComponent = new TripInfoComponent(events);
const menuComponent = new MenuComponent(getMenu());
const filterComponent = new FilterComponent(getFilter());
const sortingComponent = new SortingComponent();
const boardComponent = new BoardComponent(events);

render(tripHeaderElement, tripInfoComponent, RenderPosition.AFTER_BEGIN);
render(tripControlsElement.children[0], menuComponent, RenderPosition.AFTER_END);
render(tripControlsElement.children[1], filterComponent, RenderPosition.AFTER_END);
render(tripContainerElement, boardComponent);

if (events.length) {
  render(boardComponent, sortingComponent);
  [...groupEventsByDays(events)].forEach((day, index) => {
    const [dayTimestamp, dayEvents] = day;
    const tripDay = new TripDayComponent(dayTimestamp, index + 1);
    const eventsElement = tripDay.getElement().querySelector(`.trip-events__list`);

    dayEvents.forEach((event) => {
      renderEvent(eventsElement, event);
    });

    render(boardComponent, tripDay);
  });
} else {
  const noEventsComponent = new NoEventsComponent();

  render(boardComponent, noEventsComponent);
}
