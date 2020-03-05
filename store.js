// InitialState:
const getInitialState = () => ({
  direction: 'right',
  food: { x: 30, y: 15 },
  gameOver: false,
  score: { points: 0, max: 0, isMaxScore: false },
  snake: {
    body: [
      { x: 25, y: 25},
      { x: 24, y: 25},
      { x: 23, y: 25},
    ]
  }
});

// Store:
const snakeDispatcher = new Dispatcher();
const snakeStore = new Store(snakeDispatcher, getInitialState());

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

const GAME_OVER = 'GAME_OVER';
const gameOver = createAction(GAME_OVER);

const RELOCATE_SNAKE = 'RELOCATE_SNAKE';
const relocateSnake = createAction(RELOCATE_SNAKE);

// Handlers:

const inverseDirection = {
  up: 'down'
  down: 'up',
  left: 'rigth',
  right: 'left',
};

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
    Object.assign(state, getInitialState());
    state.score.max = max;
  }
});

snakeStore.addHandler({
  [SET_DIRECTION]: (state, { payload }) => {
    if (inverseDirection[state.direction] === payload) return;
    state.direction = payload;
  }
});

snakeStore.addHandler({
  [SET_MOTION]: state => {
    if (state.gameOver) return;
    const { direction, food, snake } = state;
    const limit = [-1, 50];
    const model = {
      right: ({ x, y }) => ({ x: x + 1, y }),
      left: ({ x, y }) => ({ x: x - 1, y }),
      up: ({ x, y }) => ({ x, y: y - 1 }),
      down: ({ x, y }) => ({ x, y: y + 1 })
    };

    const [head] = state.snake.body;
    const { x, y } = model[direction](head);
    if (limit.includes(x) || limit.includes(y)) {
      snakeDispatcher.dispatch(relocateSnake());
      return;
    }
    if (snake.body.some(b => b.x === x && b.y === y)) {
      snakeDispatcher.dispatch(gameOver());
      return;
    }
    state.snake.body.unshift({ x, y });
    if (food.x === x && food.y === y) {
      snakeDispatcher.dispatch(setFood());
      snakeDispatcher.dispatch(addPoint());
      return;
    }

    state.snake.body.pop();
  }
});

snakeStore.addHandler({
  [SET_FOOD]: state => {
    if (state.gameOver) return;
    state.food.x = getRandom(50);
    state.food.y = getRandom(50);
  }
});

snakeStore.addHandler({
  [GAME_OVER]: state => state.gameOver = true
});

snakeStore.addHandler({
  [RELOCATE_SNAKE]: state => {
    const model = { 0: 7, 49: -7 };
    const [{x, y}] = state.snake.body;
    state.direction = inverseDirection[state.direction];

    if (model[x]) {
      state.snake.body.unshift({ x, y: y + (y > 25 ? -1 : 1) });
    }

    if (model[y]) {
      state.snake.body.unshift({ x: x + (x > 25 ? -1 : 1), y });
    }
    state.snake.body.pop();

    state.snake.body.forEach(chunk => {
      chunk.x = chunk.x + (model[x] ? model[x] : 0);
      chunk.y = chunk.y + (model[y] ? model[y] : 0);
    });
  }
});
