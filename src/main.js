import BoardComponent from './components/board';
import TripInfoComponent from './components/trip-info';
import FilterComponent from './components/filter';
import MenuComponent from './components/menu';
import TripController from './controllers/trip';

import {render, RenderPositionEnum} from './utils/render';

import {getEvents} from './mock/event';
import {getMenu} from './mock/menu';
import {getFilter} from './mock/filter';

const EVENTS_AMOUNT = 10;

const tripHeaderElement = document.querySelector(`.trip-main`);
const tripControlsElement = document.querySelector(`.trip-controls`);
const tripContainerElement = document.querySelector(`.page-main .page-body__container`);
const events = getEvents(EVENTS_AMOUNT).sort((current, next) => current.dateStart - next.dateStart);

const tripInfoComponent = new TripInfoComponent(events);
const menuComponent = new MenuComponent(getMenu());
const filterComponent = new FilterComponent(getFilter());
const boardComponent = new BoardComponent();
const tripController = new TripController(boardComponent);

render(tripHeaderElement, tripInfoComponent, RenderPositionEnum.AFTER_BEGIN);
render(tripControlsElement.children[0], menuComponent, RenderPositionEnum.AFTER_END);
render(tripControlsElement.children[1], filterComponent, RenderPositionEnum.AFTER_END);
render(tripContainerElement, boardComponent);
tripController.render(events);
