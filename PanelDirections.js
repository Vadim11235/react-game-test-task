import React from 'react';
import './assets/css/PanelDirections.css';
import arrow from './assets/images/arrow.png';

export default function PanelDirections(props) {
  const gap = 5;
  const cellSize = (window.innerWidth / 4 - (5 - 1) * gap) / 5;

  const name2img = {
    up: <img src={arrow} alt='direction' />,
    right: <img src={arrow} alt='direction'style={{transform: 'rotate(90deg)'}} />,
    down: <img src={arrow} alt='direction'style={{transform: 'rotate(180deg)'}} />,
    left: <img src={arrow} alt='direction'style={{transform: 'rotate(-90deg)'}} />
  };

  const content = props.names.map((el, i) =><div key={i}>{name2img[el]}</div>);
  const rows = Math.ceil(content.length / props.cols);

  return (
    <div className='panel-directions' style={{
      gridTemplateColumns: `repeat(${props.cols}, ${cellSize}px)`,
      gridTemplateRows: `repeat(${rows}, ${cellSize}px)`
    }}>{content}</div>
  );
}