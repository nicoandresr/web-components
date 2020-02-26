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

      state.snake.body.forEach(({ x , y }) => 
        main.appendChild(new Block({ x, y }))
      );

      main.appendChild(new Food({ ...state.food }));
    });
  }
}

Board.styled = () => `
  main {
    background-color: #000;
    display: flex;
    height: 800px;
    margin: 0 auto;
    position: relative;
    width: 800px;
  }
`;
