// Actions:
const createAction = type => payload => ({ type, payload });

const ADD_POINT = 'ADD_POINT';
const addPoint = (point = 1) => createAction(ADD_POINT)(point);

const RESTART_GAME = 'RESTART_GAME';
const restartGame = createAction(RESTART_GAME);

const SET_DIRECTION = 'SET_DIRECTION';
const setDirection = createAction(SET_DIRECTION);

const SET_MOTION = 'SET_MOTION';
const setMotion = createAction(SET_MOTION);

const SET_FOOD = 'SET_FOOD';
const setFood = createAction(SET_FOOD);

const RELOCATE_SNAKE = 'RELOCATE_SNAKE';
const relocateSnake = createAction(RELOCATE_SNAKE);

const REVERSE_SNAKE_DIRECTION = 'REVERSE_SNAKE_DIRECTION';
const revertDirection= createAction(REVERSE_SNAKE_DIRECTION);

const RESIZE_BOARD = 'RESIZE_BOARD';
const resizeBoard = createAction(RESIZE_BOARD);
