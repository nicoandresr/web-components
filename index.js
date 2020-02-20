class Board extends HTMLElement {
  constructor() {
    super();
  }
}

customElements.define('game-board', Board);


class Score extends HTMLElement {
  constructor() {
    super();
    this.style = 'color: red;';
    this.innerHTML = 'Hello from score';
  }
}

customElements.define('game-score', Score);

class SnakeGame extends HTMLElement {
  constructor() {
    super();
    this.style = this.styled();
    const score = new Score();
    score.style.color = 'green';
    this.appendChild(score);
  }

  styled() {
    return `
      background-color: gray;
      height: 100%;
      display: flex;
    `;
  }
}

customElements.define('snake-game', SnakeGame);
