import EventComponent from '../components/event';
import EventFormComponent from '../components/event-form';
import TripDayComponent from '../components/trip-day';
import SortingComponent from '../components/sorting';
import NoEventsComponent from '../components/no-events';
import {KeyboardEnum} from '../mock/consts';
import {render, replace} from '../utils/render';
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

      render(this._boardComponent, sortingComponent);

      [...groupEventsByDays(events)].forEach((day, index) => {
        const [dayTimestamp, dayEvents] = day;
        const tripDay = new TripDayComponent(dayTimestamp, index + 1);
        const eventsElement = tripDay.getElement().querySelector(`.trip-events__list`);

        dayEvents.forEach((event) => {
          this._renderEvent(eventsElement, event);
        });

        render(this._boardComponent, tripDay);
      });
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
      if (evt.key === KeyboardEnum.ESC || evt.key === KeyboardEnum.ESCAPE) {
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
}
