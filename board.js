class Board extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    const main = document.createElement('main');

    shadow.appendChild(style);
    shadow.appendChild(main);
    
    style.textContent = Board.styled();

    // This is where the magic happens in each render.
    // Each listener is called afters every state mutation.
    snakeStore.addListener(state => {
      // First we cleans the board.
      main.innerHTML = '';
      // We apply the styles with the state for 
      // calculating the board size and position.
      style.textContent = Board.styled(state);
      // We renders the snake body, each chunk
      // is a small square with x and y coordinates.
      state.snake.body.forEach(({ x , y }) => 
        main.appendChild(new Block({ x, y }))
      );
      // We renders the food.
      main.appendChild(new Food({ ...state.food }));
      // And finally if the game is over we renders
      // the "Game Over" message.
      state.gameOver && main.appendChild(new GameOver());
    });
  }
}

// Board styles definition.
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
