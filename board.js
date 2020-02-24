class Board extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    const div = document.createElement('div');

    shadow.appendChild(style);
    shadow.appendChild(div);
    
    style.textContent = Board.styled();

    snakeStore.addListener(state => {
      div.innerHTML = '';

      state.snake.body.forEach(({ x , y }) => 
        div.appendChild(new Block({ x, y }))
      );

      div.appendChild(new Food({ ...state.food }));
    });
  }
}

Board.styled = () => `
  div {
    background-color: #000;
    display: flex;
    height: 800px;
    margin: 0 auto;
    position: relative;
    width: 800px;
  }
`;
