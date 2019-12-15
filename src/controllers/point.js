import EventComponent from '../components/event';
import EventFormComponent from '../components/event-form';
import {KeyName} from '../mock/consts';
import {render, replace} from '../utils/render';

export default class PointController {

  /**
   * Create point controller.
   * @param {HTMLElement} container
   * @param {Function} onDataChange
   * @param {Function} onViewChange
   */
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._eventComponent = null;
    this._eventFormComponent = null;
  }

  /**
   * Render trip event and event form. Handle toggling between them.
   *
   * @param {Object} event
   */
  render(event) {
    const oldEventComponent = this._eventComponent;
    const oldEventFormComponent = this._eventFormComponent;

    this._eventComponent = new EventComponent(event);
    this._eventFormComponent = new EventFormComponent(event);

    /**
     * Escape key press handler.
     *
     * @param {KeyboardEvent} evt
     */
    const onEscapeKeyDown = (evt) => {
      if (evt.key === KeyName.ESC || evt.key === KeyName.ESCAPE) {
        replace(this._eventComponent, this._eventFormComponent);
        document.removeEventListener(`keydown`, onEscapeKeyDown);
      }
    };

    this._eventComponent.onEdit = () => {
      this._onViewChange();
      replace(this._eventFormComponent, this._eventComponent);
      document.addEventListener(`keydown`, onEscapeKeyDown);
    };

    this._eventFormComponent.onClose = (evt) => {
      evt.preventDefault();
      replace(this._eventComponent, this._eventFormComponent);
      document.removeEventListener(`keydown`, onEscapeKeyDown);
    };

    this._eventFormComponent.onSave = (newData) => {
      this._onDataChange(this, event, Object.assign({}, newData));
    };

    if (oldEventComponent && oldEventFormComponent) {
      replace(this._eventComponent, oldEventComponent);
      replace(this._eventFormComponent, oldEventFormComponent);
    } else {
      render(this._container, this._eventComponent);
    }
  }

  /**
   * Set point to default view.
   */
  setDefaultView() {
    replace(this._eventComponent, this._eventFormComponent);
  }
}
