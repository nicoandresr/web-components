class Button extends HTMLElement {
  constructor() {
    super();

    let shadow = this.attachShadow({ mode: 'open' });
    let style = document.createElement('style');
    let button = document.createElement('button');

    shadow.appendChild(style);
    shadow.appendChild(button);

    style.textContent = Button.styled();
    button.textContent = 'Start Game';
  }
}

Button.styled = () => `
  button {
    background-color: #F3F3F3;
    border: none;
    display: flex;
    cursor: pointer;
    font-size: 22px;
    margin: auto;
    padding: 16px;
  }

  button:hover {
    background-color: #A5A5A5;
    color: #DDD;
  }

  button:active {
    background-color: #ACACAC;
    color: silver;
  }
`;

class SnakeGame extends HTMLElement {
  constructor() {
    super();
    this.style.flex = '1';

    let style = document.createElement('style');
    style.textContent = SnakeGame.styled();

    let header = document.createElement('header');
    let board = new Board(); 

    this.appendChild(style);
    this.appendChild(header);
    this.appendChild(board);

    let score = new Score();
    let button = new Button();

    header.appendChild(button);
    header.appendChild(score);
  }
}

SnakeGame.styled = () => `
  header {
    display: flex;
    justify-content: space-around;
    padding: 22px;
  }
`;

const keyMap = {
  ArrowUp: 'up',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right'
};

const getRandom = (max, min = 0) => Math.floor(Math.random() * (max - min) + min);

window.onkeyup = e => keyMap[e.code] && snakeDispatcher.dispatch(setDirection(keyMap[e.code]));

window.setInterval(() => snakeDispatcher.dispatch(setMotion()), 200);

window.setInterval(() => snakeDispatcher.dispatch(setFood()), getRandom(5, 11) * 1000);

customElements.define('snake-body', Block);
customElements.define('snake-food', Food);
customElements.define('game-board', Board);
customElements.define('game-score', Score);
customElements.define('game-button', Button);
customElements.define('snake-game', SnakeGame);
