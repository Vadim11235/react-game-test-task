import React from 'react';
import Cell from './Cell';

export default class Field extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVictory: null,
      clickCell: -1
    };
    this.w = props.cols;
    this.h = props.rows;
    this.cellSize = props.cellSize;
    this.arr = new Array(this.h);

    for (var i = 0; i < this.h; i++) {
      this.arr[i] = new Array(this.w);
      for (var j = 0; j < this.w; j++) {
        if(props.start.x === j && props.start.y === i) this.arr[i][j] = 1;
        else this.arr[i][j] = 0;
      }
    }

    for (let dir of props.directions) {
      props.start.x += dir.x;
      props.start.y += dir.y;
    }
    this.arr[props.start.y][props.start.x] = 2;
  }
  render() {
    if(this.state.isVictory !== null) setTimeout(() => {
      if(window.confirm('Сыграем ещё разок?')) window.location = window.location;
    }, 1000);

    const handleClick = (variant, i, j) => () => {
      if(variant === 2) {
        this.setState({isVictory: true});
      } else {
        this.setState({
          isVictory: false,
          clickCell: i + ';' + j
        });
      }
    };

    const cols = `repeat(${this.w}, ${this.cellSize}px)`;
    const rows = `repeat(${this.h}, ${this.cellSize}px)`;

    const field = this.arr.map((arr, i) => arr.map((v, j) => 
      <Cell key={j} type={v} hClick={handleClick(v, i, j)}
        isCurClick={i+';'+j === this.state.clickCell} isVictory={this.state.isVictory}
      />));

    return <div style={{
        display: 'inline-grid', gridGap: '5px 5px',
        gridTemplateColumns: cols, gridTemplateRows: rows
      }}>{field}</div>;
  }
}