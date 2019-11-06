import React from 'react';
import './Game.css';

function Square(props) {
    const {id} = props;
    const strId = `buttonStart${  id}`;
    const {onClick} = props; 
    const {value} = props;
    return (
      <button type="button" id={strId} className="square" onClick={onClick}>
        {value}
      </button>
    );
  }
 export default class Board extends React.Component {

    renderSquare(i) {
    const {squares, onClick} = this.props;
      return (

        <Square id={i}
          value={squares[i]}
          onClick={() => onClick(i)}
        />
      );
    }
  
    render() {
        const result =[];
        let index =0;
        for(let i =0;i<20;i+=1) {
            const rows =[];
            for(let j=0;j<20;j+=1) {
                rows.push(this.renderSquare(parseInt(index,10)));
                index+=1;
            }
            const row = <div className="board-row">{rows}</div>
            result.push(row);
        }
    
      return (
        <div>
            {result}
        </div>
      );
    }
  }