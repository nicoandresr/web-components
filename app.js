class SnakeGame extends HTMLElement {
  constructor() {
    super();
    this.style = SnakeGame.styled();
    this.score = new Score();
    this.board = new Board(); 
    this.appendChild(this.score);
    this.appendChild(this.board);
  }
}

SnakeGame.styled = () => `
  background-color: gray;
  flex: 1;
`;

const keyMap = {
  ArrowUp: 'up',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right'
};

const getRandom = max => Math.floor(Math.random() * Math.floor(max));

window.onkeyup = e => keyMap[e.code] && snakeDispatcher.dispatch(setDirection(keyMap[e.code]));

window.setInterval(() => snakeDispatcher.dispatch(setMotion()), 200);

customElements.define('snake-body', Block);
customElements.define('snake-food', Food);
customElements.define('game-board', Board);
customElements.define('game-score', Score);
customElements.define('snake-game', SnakeGame);
