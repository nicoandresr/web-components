class Score extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });
    const span = document.createElement('span');
    const style = document.createElement('style');

    shadow.appendChild(span);
    shadow.appendChild(style);

    style.textContent = Score.styled();
    span.textContent = 'Score 0';

    snakeStore.addListener(state => {
      const { isMaxScore, points } = state.score;
      span.textContent = `Score ${points}`;
      style.textContent = Score.styled({ isMaxScore });
    });
  }
}

Score.styled = (props = {}) => `
  span {
    color: ${props.isMaxScore ? 'red' : '#F3F3F3'};
    display: flex;
    font-size: 28px;
    margin: auto;
    width: max-content;
  }
`;
