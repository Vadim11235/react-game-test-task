import React from 'react';
import Field from './Field';
import PanelDirections from './PanelDirections';
import './assets/css/App.css';
import logo from './assets/images/logo.png';
import icon from './assets/images/icon.png';

export default class App extends React.Component {
  constructor() {
    super();
    this.rows = 3;
    this.cols = 3;
    this.qty = 10;
  }
  componentDidMount() {
    document.title = 'Puppy\'s bone by Vadim Akinshin';
    document.querySelector('link[rel=icon]').href = icon;
    document.querySelector('link[rel=apple-touch-icon]').href = icon;
    document.querySelector('meta[name=theme-color]').content = '#ff4545';
    document.querySelector('meta[name=description]').content = 'Test task for the game «Labyrinth» by Vadim Akinshin 2020';
  }
  render() {
    const directionsNames = [];

    const allowableCells = point => {
      const variants = {
        up: { x: 0, y: -1 },
        right: { x: 1, y: 0 },
        down: { x: 0, y: 1 },
        left: { x: -1, y: 0 }
      };
      let x = point.x,
          y = point.y;

      if(x === 0) delete variants.left;
      else if(x === this.cols - 1) delete variants.right;
      if(y === 0) delete variants.up;
      else if(y === this.rows - 1) delete variants.down;
      return variants;
    };
    const rndDirection = cells => {
      const dirs = Object.keys(cells),
            rndDir = dirs[ rnd(0, dirs.length - 1) ];
      directionsNames.push(rndDir);
      return cells[rndDir];
    };
    const moveCell = (cur, dir) => ({
      x: cur.x + dir.x,
      y: cur.y + dir.y
    });
    const genDirections = pStart => {
      if(this.qty === 0) return [];

      let curCell = pStart;
      const res = [ rndDirection( allowableCells(curCell) ) ];

      for (var i = 1; i < this.qty; i++) {
        curCell = moveCell(curCell, res[i - 1]);
        res[i] = rndDirection( allowableCells(curCell) );
      }
      return res;
    };

    const pointStart = { x: rnd(0, this.cols - 1), y: rnd(0, this.rows - 1) };
    const directions = genDirections(pointStart);

    const gap = 5;
    const maxWidth = 50;
    let cellWidth = (window.innerWidth / 2 - (this.cols - 1) * gap) / this.cols;
    if(cellWidth > maxWidth) cellWidth = maxWidth;

    return (
      <div>
        <header className="header">
          <div className="header__content">
            <div className="logo"><img src={logo} alt="logo" /></div>
            <span>Помоги щенку найти, где спрятать кость</span>
          </div>
        </header>
        <main className="content">
          <Field rows={this.rows} cols={this.cols} cellSize={cellWidth}
            start={pointStart} directions={directions} />
          <div></div>
          <PanelDirections names={directionsNames} cols={this.cols} />
        </main>
      </div>
    );
  }
}

function rnd(min, max) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1));
}