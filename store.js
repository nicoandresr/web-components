// -----------------------------InitialState----------------------------------
const getInitialState = () => ({
  boardSize: 50, // The board size is a square of 50 points, each point corresponds to 16x16 px.
  direction: 'right', // The initial direction is right.
  food: { x: 30, y: 15 }, // The first food is in this point.
  gameOver: false,
  score: { points: 0, max: 0, isMaxScore: false }, // The score object.
  snake: { // The snake is a sucession of points it the board, the initial snake have three points.
    body: [
      { x: 25, y: 25}, // The first point is the head.
      { x: 24, y: 25}, // The middle points are the core.
      { x: 23, y: 25}, // THe last point is the tail.
    ]
  }
});
// --------------------------------Store Instance-----------------------
const snakeDispatcher = new Dispatcher();
const snakeStore = new Store(snakeDispatcher, getInitialState());
// --------------------------------Handlers---------------------------
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
    if (payload === inverseModel[state.direction]) return;
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
    // Checks if the new direction is out of the board.
    if (limit.includes(x) || limit.includes(y)) {
      snakeDispatcher.dispatch(revertDirection());
      snakeDispatcher.dispatch(resizeBoard());
      return;
    }
    // The snake is automatically relocated after each colision, 
    // If the snake was not relocated then the game is over.
    if (snake.body.some(b => b.x === x && b.y === y)) {
      state.gameOver = true;
      return;
    }
    // The new head is added to the snake, this simulates
    // the snake motion.
    state.snake.body.unshift({ x, y });
    // If the new head is over the food...
    if (food.x === x && food.y === y) {
      // when we create a new food
      snakeDispatcher.dispatch(setFood());
      // And ups the score in one point.
      snakeDispatcher.dispatch(addPoint());
      // Here we returns and the snake grows.
      return;
    }

    // If the snake is not over the food...
    // the snake lost her tail, this simulates the snake motion.
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
