// InitialState:
const getInitialState = () => ({
  boardSize: 50,
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

const RELOCATE_SNAKE = 'RELOCATE_SNAKE';
const relocateSnake = createAction(RELOCATE_SNAKE);

const REVERSE_SNAKE_DIRECTION = 'REVERSE_SNAKE_DIRECTION';
const revertDirection= createAction(REVERSE_SNAKE_DIRECTION);

const RESIZE_BOARD = 'RESIZE_BOARD';
const resizeBoard = createAction(RESIZE_BOARD);

// Handlers:

const inverseModel = {
  up: 'down',
  down: 'up',
  left: 'right',
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
    if (inverseModel[state.direction] === payload) return;
    state.direction = payload;
  }
});

snakeStore.addHandler({
  [SET_MOTION]: state => {
    if (state.gameOver) return;
    const { direction, food, snake } = state;
    const limit = [-1, state.boardSize];
    const model = {
      right: ({ x, y }) => ({ x: x + 1, y }),
      left: ({ x, y }) => ({ x: x - 1, y }),
      up: ({ x, y }) => ({ x, y: y - 1 }),
      down: ({ x, y }) => ({ x, y: y + 1 })
    };

    const [head] = state.snake.body;
    const { x, y } = model[direction](head);
    if (limit.includes(x) || limit.includes(y)) {
      snakeDispatcher.dispatch(revertDirection());
      snakeDispatcher.dispatch(resizeBoard());
      return;
    }
    
    if (snake.body.some(b => b.x === x && b.y === y)) {
      state.gameOver = true;
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
    state.food.x = getRandom(state.boardSize);
    state.food.y = getRandom(state.boardSize);
  }
});

snakeStore.addHandler({
  [REVERSE_SNAKE_DIRECTION]: state => {
    const { boardSize, direction } = state;
    const middleBoard = Math.floor(boardSize / 2);
    const upperLimit = boardSize - 1;
    const [{x, y}] = state.snake.body;

    state.direction = inverseModel[direction];

    if (['left', 'right'].includes(direction) && ( x <= 0 || x >= upperLimit)) {
      state.snake.body.unshift({ x, y: y + (y > middleBoard ? -1 : 1) });
    }

    if (['up', 'down'].includes(direction) && ( y <= 0 || y >= upperLimit)) {
      state.snake.body.unshift({ x: x + (x > middleBoard ? -1 : 1), y });
    }

    state.snake.body.pop();
  }
});

snakeStore.addHandler({
  [RESIZE_BOARD]: state => {
    if (state.boardSize <= 15) return;
    state.boardSize = state.boardSize - 7;

    snakeDispatcher.dispatch(relocateSnake());
  }
});

snakeStore.addHandler({
  [RELOCATE_SNAKE]: state => {
    const middleBoard = Math.floor(state.boardSize / 2);
    const upperLimit = state.boardSize - 1;
    const [{x, y}] = state.snake.body;
    const relocate = (point, axis) => point + (axis >= upperLimit ? -7 : 0);

    state.snake.body.forEach(chunk => {
      chunk.x = relocate(chunk.x, x);
      chunk.y = relocate(chunk.y, y);
    });

    snakeDispatcher.dispatch(setFood());
  }
});
