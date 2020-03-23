import React from 'react';
import './assets/css/Cell.css';
import bone from './assets/images/bone.png';
import win from './assets/images/win.png';
import lose from './assets/images/lose.png';

export default function Cell(props) {
  let icon = '',
      addClassName = '',
      cell;

  if(props.isVictory !== null) {
    if(props.isVictory === false) {
      if(props.isCurClick) {
        icon = <img src={lose} alt='lose' />;
        addClassName = 'cell_empty';
      }
      else if(props.type === 2) {
        icon = <img src={win} alt='win' />;
        addClassName = 'cell_win';
      }
    }
    else if(props.type === 2) {
      icon = <img src={win} alt='win' />;
      addClassName = 'cell_win';
    }
  }

  if(props.type === 1)
    cell = <div onClick={props.hClick}
      className={`cell ${addClassName}`}><img src={bone} alt='bone' /></div>;
  else
    cell = <div onClick={props.hClick}
      className={`cell ${addClassName}`}>{icon}</div>;

  return cell;
}