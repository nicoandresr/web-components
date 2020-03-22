class Block extends HTMLElement {
  constructor(props = {}) {
    super();

    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    const div = document.createElement('div');

    shadow.appendChild(style);
    shadow.appendChild(div);

    style.textContent = Block.styled(props);
  }
}

Block.styled = props => `
  div {
    background-color: ${props.food ? 'blue' : 'pink'};
    border-radius: ${props.food ? '16px' : '0'};
    height: 16px;
    left: ${props.x ? (props.x * 16) + 'px' : '0'};
    position: absolute;
    top: ${props.y ? (props.y * 16) + 'px' : '0'};
    width: 16px;
  }
`;

class Food extends Block {
  constructor(props) {
    super({ ...props, food: true });
  }
}
