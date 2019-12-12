import EventComponent from '../components/event';
import EventFormComponent from '../components/event-form';
import TripDayComponent from '../components/trip-day';
import SortingComponent, {SortType} from '../components/sorting';
import NoEventsComponent from '../components/no-events';
import {KeyName} from '../mock/consts';
import {render, replace, RenderPosition} from '../utils/render';
import {groupEventsByDays} from '../utils/common';

/**
 * Manage trip board rendering.
 *
 * @class TripController
 */
export default class TripController {

  /**
   * Create a trip controller.
   *
   * @param {BaseComponent} boardComponent
   */
  constructor(boardComponent) {
    this._boardComponent = boardComponent;
  }

  render(events) {
    if (events.length) {
      const sortingComponent = new SortingComponent();

      sortingComponent.onClick = (evt) => {
        this._sortingChangeHandler(evt.target.dataset.sortType, events);
      };

      render(this._boardComponent, sortingComponent, RenderPosition.AFTER_BEGIN);
      this._renderGroupedEvents(events);

    } else {
      const noEventsComponent = new NoEventsComponent();

      render(this._boardComponent, noEventsComponent);
    }
  }

  /**
   * Render trip event and event form. Handle toggling between them.
   *
   * @param {HTMLElement} parentElement
   * @param {Object} event
   */
  _renderEvent(parentElement, event) {
    const eventComponent = new EventComponent(event);
    const eventFormComponent = new EventFormComponent(event);

    /**
     * Escape key press handler.
     *
     * @param {KeyboardEvent} evt
     */
    const escapeKeyDownHandler = (evt) => {
      if (evt.key === KeyName.ESC || evt.key === KeyName.ESCAPE) {
        replace(eventComponent, eventFormComponent);
        document.removeEventListener(`keydown`, escapeKeyDownHandler);
      }
    };

    eventComponent.onEdit = () => {
      replace(eventFormComponent, eventComponent);
      document.addEventListener(`keydown`, escapeKeyDownHandler);
    };

    eventFormComponent.onClose = (evt) => {
      evt.preventDefault();
      replace(eventComponent, eventFormComponent);
      document.removeEventListener(`keydown`, escapeKeyDownHandler);
    };

    render(parentElement, eventComponent);
  }

  /**
   * Render events, that grouped by trip day.
   *
   * @param {Array} events
   *
   * @private
   */
  _renderGroupedEvents(events) {
    [...groupEventsByDays(events)].forEach((day, index) => {
      const [dayTimestamp, dayEvents] = day;
      const tripDay = new TripDayComponent(dayTimestamp, index + 1);
      const eventsElement = tripDay.getElement().querySelector(`.trip-events__list`);

      dayEvents.forEach((event) => {
        this._renderEvent(eventsElement, event);
      });

      render(this._boardComponent.tripDaysElement, tripDay);
    });
  }

  /**
   * Render list of events without grouping.
   *
   * @param {Array} events
   *
   * @private
   */
  _renderEvents(events) {
    const tripDay = new TripDayComponent(0, 0, false);
    const eventsElement = tripDay.getElement().querySelector(`.trip-events__list`);

    events.forEach((event) => {
      this._renderEvent(eventsElement, event);
    });

    render(this._boardComponent.tripDaysElement, tripDay);
  }

  /**
   * @param {string} sortType
   * @param {Array} events
   *
   * @private
   */
  _sortingChangeHandler(sortType, events) {
    let sortedEvents = [];

    switch (sortType) {
      case SortType.DURATION :
        sortedEvents = events.slice().sort((a, b) => (b.dateEnd - b.dateStart) - (a.dateEnd - a.dateStart));
        break;
      case SortType.PRICE :
        sortedEvents = events.slice().sort((a, b) => b.price - a.price); // TODO: should i count price with offers?
        break;
      case SortType.DEFAULT :
        sortedEvents = events.slice();
        break;
    }

    this._boardComponent.tripDaysElement.innerHTML = ``;

    if (sortType === SortType.DEFAULT) {
      this._renderGroupedEvents(sortedEvents);
    } else {
      this._renderEvents(sortedEvents);
    }

  }
}
