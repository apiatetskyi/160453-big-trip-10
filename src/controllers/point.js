import EventComponent from '../components/event';
import EventFormComponent from '../components/event-form';
import {KeyName} from '../mock/consts';
import {render, replace} from '../utils/render';

export default class PointController {

  /**
   * Create point controller.
   * @param {HTMLElement} container
   */
  constructor(container) {
    this._container = container;
  }

  /**
   * Render trip event and event form. Handle toggling between them.
   *
   * @param {Object} event
   */
  render(event) {
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

    render(this._container, eventComponent);
  }
}
