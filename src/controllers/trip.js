import TripDayComponent from '../components/trip-day';
import SortingComponent, {SortType} from '../components/sorting';
import NoEventsComponent from '../components/no-events';
import PointController from './point';
import {render, RenderPosition} from '../utils/render';
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
    this._events = [];
    this._boardComponent = boardComponent;
    this._pointControllers = [];

    this._onSortingChange = this._onSortingChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
  }

  render(events) {
    this._events = events;

    if (this._events.length) {
      const sortingComponent = new SortingComponent();

      sortingComponent.onButtonClick = (evt) => {
        this._onSortingChange(evt.target.dataset.sortType);
      };

      render(this._boardComponent, sortingComponent, RenderPosition.AFTER_BEGIN);
      this._renderGroupedEvents(this._events);

    } else {
      const noEventsComponent = new NoEventsComponent();

      render(this._boardComponent, noEventsComponent);
    }
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
        this._renderPoint(event, eventsElement);
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
      this._renderPoint(event, eventsElement);
    });

    render(this._boardComponent.tripDaysElement, tripDay);
  }

  /**
   * @param {Object} event
   * @param {HTMLElement} container
   *
   * @private
   */
  _renderPoint(event, container) {
    const pointController = new PointController(container, this._onDataChange, this._onViewChange);

    this._pointControllers.push(pointController);
    pointController.render(event);
  }

  /**
   * @param {string} sortType
   *
   * @private
   */
  _onSortingChange(sortType) {
    let sortedEvents = [];

    switch (sortType) {
      case SortType.DURATION :
        sortedEvents = this._events.slice().sort((a, b) => (b.dateEnd - b.dateStart) - (a.dateEnd - a.dateStart));
        break;
      case SortType.PRICE :
        sortedEvents = this._events.slice().sort((a, b) => b.price - a.price); // TODO: should i count price with offers?
        break;
      case SortType.DEFAULT :
        sortedEvents = this._events.slice();
        break;
    }

    this._boardComponent.tripDaysElement.innerHTML = ``;

    if (sortType === SortType.DEFAULT) {
      this._renderGroupedEvents(sortedEvents);
    } else {
      this._renderEvents(sortedEvents);
    }
  }

  /**
   * Update events data after user actions.
   *
   * @param {PointController} pointController
   * @param {Object} oldData
   * @param {Object} newData
   *
   * @private
   */
  _onDataChange(pointController, oldData, newData) {
    const oldDataIndex = this._events.findIndex((item) => oldData === item);

    this._events[oldDataIndex] = newData;
    pointController.render(newData);
  }

  /**
   * Call back before change point view.
   *
   * @private
   */
  _onViewChange() {
    if (this._pointControllers) {
      this._pointControllers.forEach((pointController) => {
        pointController.setDefaultView();
      });
    }
  }
}
