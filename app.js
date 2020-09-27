// ----------------------------Web Components----------------------------
customElements.define('snake-body', Block);
customElements.define('snake-food', Food);
customElements.define('game-board', Board);
customElements.define('game-score', Score);
customElements.define('game-button', Button);
customElements.define('game-over', GameOver);
customElements.define('snake-game', SnakeGame);

// ------------------Register events and intervals-----------------------------
// Arrows motions maps
const keyMap = {
  ArrowUp: 'up',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right'
};
// Register enventHandler for arrows.
window.onkeyup = e => keyMap[e.code] && snakeDispatcher.dispatch(setDirection(keyMap[e.code]));
// Set interval for snake motion.
window.setInterval(() => snakeDispatcher.dispatch(setMotion()), 140);
// Set interval for foot random position.
const getRandom = (max, min = 0) => Math.floor(Math.random() * (max - min) + min);
window.setInterval(() => snakeDispatcher.dispatch(setFood()), getRandom(5, 11) * 1000);

