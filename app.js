class Board extends HTMLElement {
  constructor() {
    super();
    this.style = Board.styled();
  }
}

Board.styled = () => `
  background-color: #000;
  display: flex;
  height: 800px;
  margin: 0 auto;
  width: 800px;
`;

class Score extends HTMLElement {
  constructor() {
    super();
    this.style = Score.styled();
    this.innerHTML = 'Score: 0';
  }
}

Score.styled = () => `
  color: #F3F3F3;
  display: flex;
  font-size: 28px;
  margin: auto;
  width: max-content;
`;


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

customElements.define('game-board', Board);
customElements.define('game-score', Score);
customElements.define('snake-game', SnakeGame);
