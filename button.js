class Button extends HTMLElement {
  constructor() {
    super();

    let shadow = this.attachShadow({ mode: 'open' });
    let style = document.createElement('style');
    let button = document.createElement('button');

    shadow.appendChild(style);
    shadow.appendChild(button);

    style.textContent = Button.styled();
    button.textContent = 'Restart Game';

    button.onclick = () => snakeDispatcher.dispatch(restartGame()); 
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

