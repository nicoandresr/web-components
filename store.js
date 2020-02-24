// InitialState:
const initialState = {
  score: { points: 0, max: 0, isMaxScore: false },
  direction: 'right',
  food: { x: 30, y: 15 },
  snake: {
    body: [
      { x: 25, y: 25},
      { x: 24, y: 25},
      { x: 23, y: 25},
    ]
  }
};

// Store:
const snakeDispatcher = new Dispatcher();
const snakeStore = new Store(snakeDispatcher, initialState);

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

// Handlers:
snakeStore.addHandler({
  [ADD_POINT]: (state, action) => {
    const { points, max } = state.score;
    const next = points + action.payload;
    const isMax = next > max;
    state.score.points = next;
    state.score.max = isMax ? next : max;
    state.score.isMaxScore = isMax;
  }
});

snakeStore.addHandler({
  [RESTART_GAME]: state => {
    const { max } = state.score;
    Object.assign(state, initialState);
    state.score.max = max;
  }
});

snakeStore.addHandler({
  [SET_DIRECTION]: (state, { payload }) => {
    const model = {
      up: ['left','right'],
      down: ['left','right'],
      left: ['up', 'down'],
      right: ['up', 'down'],
    };
    if (!model[state.direction].includes(payload)) return;
    state.direction = payload;
  }
});

snakeStore.addHandler({
  [SET_MOTION]: state => {
    const { direction } = state;
    const limit = [-1, 50];
    const model = {
      right: ({ x, y }) => ({ x: x + 1, y }),
      left: ({ x, y }) => ({ x: x - 1, y }),
      up: ({ x, y }) => ({ x, y: y - 1 }),
      down: ({ x, y }) => ({ x, y: y + 1 })
    };

    const [head] = state.snake.body;
    const { x, y } = model[direction](head);
    if (limit.includes(x) || limit.includes(y)) return;
    state.snake.body.unshift({ x, y });
    state.snake.body.pop();
  }
});
