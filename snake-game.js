// Snake Game main web component.
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
