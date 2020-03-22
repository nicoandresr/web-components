class Board extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    const main = document.createElement('main');

    shadow.appendChild(style);
    shadow.appendChild(main);
    
    style.textContent = Board.styled();

    snakeStore.addListener(state => {
      main.innerHTML = '';

      style.textContent = Board.styled(state);

      state.snake.body.forEach(({ x , y }) => 
        main.appendChild(new Block({ x, y }))
      );

      main.appendChild(new Food({ ...state.food }));

      state.gameOver && main.appendChild(new GameOver());
    });
  }
}

Board.styled = ({ boardSize = 50} = {}) => `
  main {
    background-color: #000;
    display: flex;
    height: ${boardSize * 16}px;
    margin: 0 auto;
    position: relative;
    width: ${boardSize * 16}px;
  }

  game-over {
    color: white;
    font-size: 48px;
    left: 50%;
    position: absolute;
    top: 50%;
    translate: -50% -50%;
  }
`;
