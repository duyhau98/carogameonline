import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import $ from 'jquery';
import swal from 'sweetalert';
import { socket } from '../helpers/helper';
import './Game.css';
// eslint-disable-next-line import/imports-first
import * as actionss from '../actions/index';
import Board from './Board';
import BackImg from '../assets/images/back.png'


class Game extends React.Component {
  constructor(props) {
    super(props);
    const { actions, onSetDauHang } = this.props;
    if (actions.user === null) {
      const { history } = this.props;
      history.push('/login');
    }

    socket.on('RECEIVE_MESSAGE', data => {
      if (actions.user !== null) {

        // eslint-disable-next-line no-empty
        if (data.author === actions.user.username && data.id === actions.partnerID) {

          const userMsg = `<div class="d-flex justify-content-end">
          <div class="msg_cotainer_send">
          ${data.message}
            <span class="msg_time_send">${data.time}</span>
          </div>
          <div class="img_cont_msg">
        <img src="${data.Imglink}" class="rounded-circle user_img_msg">
          </div>
        </div>` ;
          $('#msgAreID').append(userMsg);
        } else {

        const userMsg = `<div class="d-flex justify-content-start">
        <div class="img_cont_msg">
          <img src="${data.ImgLink}" class="rounded-circle user_img_msg">
        </div>
        <div class="msg_cotainer">
        ${data.message}
          <span class="msg_time">${data.time}</span>
        </div>
        </div>` ;
          $('#msgAreID').append(userMsg);
        }
      }
    });

    socket.on('RECEIVE_PLAY_WITH_ANOTHER', data => {
      if (actions.user !== null) {
        // eslint-disable-next-line no-empty
        if (data.id !== actions.user.id && data.id !== null) {
          this.handlePartnerClick(data.position);
        }
      }
    });

    socket.on('RECEIVE_XIN_DAU_HANG', data => {
      if (actions.user !== null) {
        // eslint-disable-next-line no-empty
        if (data.id === actions.partnerID && data.id !== null && data.id === actions.partnerID) {
          swal(`Xin chúc mừng ${actions.partnerName  } đã đầu hàng, bạn là người chiến thắng!`)
          .then((value) => {
            onSetDauHang(true);
            this.handleClick(0, true);
          });
        }
      }
    });

    socket.on('RECEIVE_REQUEST_START_AGAIN', data => {
      if (actions.user !== null) {
        // eslint-disable-next-line no-empty
        if (data.id === actions.partnerID && data.id !== null) {
          swal({
            title: `Bạn có muốn chơi lại không?`,
            text: `${actions.partnerName  } muốn chơi lại từ đầu`,
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              onSetDauHang(false);
              socket.emit('REPLY_START_AGAIN', {
                id:  actions.user.id,
                isStartAgain: true
              });
            } else {
              socket.emit('REPLY_START_AGAIN', {
                id:  actions.user.id,
                isStartAgain: false
              });
            }
          });
        }
      }
    });

    socket.on('RECEIVE_REPLY_START_AGAIN', data => {
      if (actions.user !== null) {
        // eslint-disable-next-line no-empty
        if (data.id === actions.partnerID && data.id !== null) {
          if(data.isStartAgain===true) {
            onSetDauHang(false);
          } else {
            swal(`${actions.partnerName} không muốn chơi lại!`);
            onSetDauHang(true);
          }
        }
      }
    });

    socket.on('RECEIVE_REQUEST_UNDO', data => {
      if (actions.user !== null) {
        // eslint-disable-next-line no-empty
        if (data.id === actions.partnerID&& data.id !== null) {
          swal({
            title: `Bạn có muốn chơi lại không?`,
            text: `${actions.partnerName  } muốn quay trở lại bước trước đó`,
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {

              onSetDauHang(false);
              socket.emit('REPLY_UNDO', {
                id:  actions.user.id,
                isAccept: true
              });
              
            } else {
              socket.emit('REPLY_UNDO', {
                id:  actions.user.id,
                isAccept: false
              });
            }
          });
        }
      }
    });


  }

  calculateWinner = squares => {
    let countCheo = 1;

    for (let i = 0; i < 20; i += 1) {
      let countNgang = 1;
      let countDoc = 1;
      let checkTraiNgang = true;
      let checkPhaiNgang = true;
      let checkTraiDoc = true;
      let checkPhaiDoc = true;
      for (let j = 0; j < 19; j += 1) {
        if (squares[i * 20 + j] != null && squares[i * 20 + j + 1] != null) {
          if (squares[i * 20 + j] !== squares[i * 20 + j + 1]) {
            countNgang = 1;
          } else {
            countNgang += 1;
            if (countNgang === 5) {
              for (let k = 0; k < j; k += 1) {
                if (squares[i * 20 + k] != null) {
                  if (squares[i * 20 + k] !== squares[i * 20 + j + 1]) {
                    checkTraiNgang = false;
                  }
                }
              }
              for (let k = 18; k >= j + 2; k -= 1) {
                if (squares[i * 20 + k] != null) {
                  if (squares[i * 20 + k] !== squares[i * 20 + j + 1]) {
                    checkPhaiNgang = false;
                  }
                }
              }
              if (checkTraiNgang === false && checkPhaiNgang === false) {
                countNgang = 1;
              } else {
                for (let count = j + 1; count > j - 4; count -= 1) {
                  $(`#buttonStart${i * 20 + count}`).addClass('selectedButton');
                }
                return squares[i * 20 + j];
              }
            }
          }
        } else {
          countNgang = 1;
        }

        // Hàng dọc
        if (squares[j * 20 + i] != null && squares[(j + 1) * 20 + i] != null) {
          if (squares[j * 20 + i] !== squares[(j + 1) * 20 + i]) {
            countDoc = 1;
          } else {
            countDoc += 1;

            if (countDoc === 5) {
              for (let k = 0; k < j; k += 1) {
                if (squares[k * 20 + i] != null) {
                  if (squares[k * 20 + i] !== squares[(j + 1) * 20 + i]) {
                    checkTraiDoc = false;
                  }
                }
              }
              for (let k = 18; k >= j + 2; k -= 1) {
                if (squares[k * 20 + i] != null) {
                  if (squares[k * 20 + i] !== squares[(j + 1) * 20 + i]) {
                    checkPhaiDoc = false;
                  }
                }
              }
              if (checkPhaiDoc === false && checkTraiDoc === false) {
                countDoc = 1;
              } else {
                for (let count = j + 1; count > j - 4; count -= 1) {
                  $(`#buttonStart${count * 20 + i}`).addClass('selectedButton');
                }
                return squares[j * 20 + i];
              }
            }
          }
        } else {
          countDoc = 1;
        }
      }
    }
    // Đường chéo
    for (let i = 0; i < 16; i += 1) {
      for (let j = 0; j < 16; j += 1) {
        if (
          squares[i * 20 + j] != null &&
          squares[(i + 1) * 20 + j + 1] != null
        ) {
          if (squares[i * 20 + j] !== squares[(i + 1) * 20 + j + 1]) {
            countCheo = 1;
          } else {
            countCheo += 1;
            if (countCheo === 5) {
              for (let k = i + 1; k >= i - 3; k -= 1) {
                for (let count = j + 1; count >= j - 3; count -= 1) {
                  $(`#buttonStart${k * 20 + count}`).addClass('selectedButton');
                  k -= 1;
                }
              }
              countCheo = 1;
              return squares[i * 20 + j];
            }
            i += 1;
          }
        } else {
          countCheo = 1;
        }
      }
    }

    for (let i = 19; i >= 5; i -= 1) {
      for (let j = 19; j >= 5; j -= 1) {
        if (
          squares[i * 20 + j] != null &&
          squares[(i + 1) * 20 + j + 1] != null
        ) {
          if (squares[i * 20 + j] !== squares[(i + 1) * 20 + j + 1]) {
            countCheo = 1;
          } else {
            countCheo += 1;
            if (countCheo === 5) {
              for (let k = i - 1; k <= i + 3; k += 1) {
                for (let count = j - 1; count <= j + 3; count += 1) {
                  $(`#buttonStart${k * 20 + count}`).addClass('selectedButton');
                  k += 1;
                }
              }
              countCheo = 1;
              return squares[i * 20 + j];
            }
            i -= 1;
          }
        } else {
          countCheo = 1;
        }
      }
    }

    let duongCheoPhu = 1;
    for (let i = 0; i < 16; i += 1) {
      for (let j = 19; j >= 5; j -= 1) {
        if (
          squares[i * 20 + j] != null &&
          squares[(i + 1) * 20 + j - 1] != null
        ) {
          if (squares[i * 20 + j] !== squares[(i + 1) * 20 + j - 1]) {
            duongCheoPhu = 1;
          } else {
            duongCheoPhu += 1;
            if (duongCheoPhu === 5) {
              for (let k = i + 1; k >= i - 3; k -= 1) {
                for (let count = j - 1; count <= j + 3; count += 1) {
                  $(`#buttonStart${k * 20 + count}`).addClass('selectedButton');
                  k -= 1;
                }
              }
              duongCheoPhu = 1;
              return squares[i * 20 + j];
            }
            i += 1;
          }
        } else {
          duongCheoPhu = 1;
        }
      }
    }

    for (let i = 0; i < 16; i += 1) {
      for (let j = 19; j > 0; j -= 1) {
        if (
          squares[i * 20 + j] != null &&
          squares[(i + 1) * 20 + j - 1] != null
        ) {
          if (squares[i * 20 + j] !== squares[(i + 1) * 20 + j - 1]) {
            duongCheoPhu = 1;
          } else {
            duongCheoPhu += 1;
            if (duongCheoPhu === 5) {
              for (let k = i - 1; k <= i + 3; k += 1) {
                for (let count = j + 1; count >= j - 3; count -= 1) {
                  $(`#buttonStart${k * 20 + count}`).addClass('selectedButton');
                  k += 1;
                }
              }
              duongCheoPhu = 1;
              return squares[i * 20 + j];
            }
            i += 1;
          }
        } else {
          duongCheoPhu = 1;
        }
      }
    }

    return null;
  };

  doSendMessage = ev => {
    const { actions } = this.props;
    ev.preventDefault();
    const d = new Date();
    const t = d.toLocaleTimeString();
    socket.emit('SEND_MESSAGE', {
      id: actions.user.id,
      author: ev.target.username.value,
      message: ev.target.message.value,
      ImgLink: actions.user.ImgLink,
      time: t
    });
  };

  xinHoa = () =>{

  }

  dauHang = () =>{
    const { actions,onSetDauHang } = this.props;

    Promise.resolve(
      onSetDauHang(true),
    ).then(()=>{
      this.handleClick(0, true);
      socket.emit('XIN_DAU_HANG', {
        id:  actions.user.id
      });
    });

  }

  handlePartnerClick = (i) => {
    


    const { actions, onSetTurn } = this.props;
    const { stepNumber, history } = actions;

    const historyy = history.slice(0, stepNumber + 1);
    const current = history[historyy.length - 1];
    const squares = current.squares.slice();

    if (this.calculateWinner(squares) || squares[i] ) {
      return;
    }
    const { xIsNext } = actions;
    const { onHandleClick } = this.props;

    
    if (actions.isPlayWithAnother === true ) {
      
      socket.emit('PLAY_WITH_ANOTHER', {
        position: i,
        id: actions.user.id
      });
      squares[i] = xIsNext ? 'X' : 'O';

      onHandleClick(
        history.concat([
          {
            squares
          }
        ]),
        history.length,
        !xIsNext
      );

      onSetTurn(true);
    }
  }

  handleClick = (i,isDauHang) => {
    const { actions, onSetTurn } = this.props;
    const { stepNumber, history } = actions;

    const historyy = history.slice(0, stepNumber + 1);

    const current = history[historyy.length - 1];
    const squares = current.squares.slice();

    if (this.calculateWinner(squares) || squares[i] ||actions.isPartnerDauHang || isDauHang) {
      return;
    }
    const { xIsNext } = actions;
    const { onHandleClick } = this.props;
if(actions.isPlayWithComputer===false) {
  if (actions.isPlayWithAnother === true && actions.isTurn === true) {
      
    socket.emit('PLAY_WITH_ANOTHER', {
      position: i,
      id: actions.user.id
    });
    squares[i] = xIsNext ? 'X' : 'O';

    onHandleClick(
      historyy.concat([
        {
          squares
        }
      ]),
      historyy.length,
      !xIsNext
    );

    onSetTurn(false);
  } else {
    swal('Xin lỗi, không phải lượt của bạn');
  }
}


    if (actions.isPlayWithComputer) {
      squares[i] = xIsNext ? 'X' : 'O';

      onHandleClick(
        historyy.concat([
          {
            squares
          }
        ]),
        historyy.length,
        !xIsNext
      );

      let k = Math.floor(Math.random() * (400 + 1));
      while (squares[k] !== null) {
        k = Math.floor(Math.random() * (400 + 1));
      }
      if (this.calculateWinner(squares) || squares[k]) {
        return;
      }
      squares[k] = xIsNext ? '0' : 'X';
      // this.setState({

      // });

      onHandleClick(
        historyy.concat([
          {
            squares
          }
        ]),
        historyy.length,
        !xIsNext
      );
    }

    console.log(actions.isTurn);
  };
  // Xin phesp choi

  handleUnDo = (step) =>{

    if(step>0) {
      const { actions, onSetStep } = this.props;
      const { history } = actions;
      for (let i = 0; i < 400; i += 1) {
        $(`#buttonStart${i}`).removeClass('selectedButton');
      }
      for (let i = 0; i < history.length; i += 1) {
        $(`#button${i}`).removeClass('selectedButton');
      }
      $(`#button${step}`).addClass('selectedButton');
  
      onSetStep(step, step % 2 === 0);
    }
  }

  jumpTo(step) {
  
    console.log(step);

    const { actions, onSetStep } = this.props;
    const { history } = actions;

    if(step===0) {
      socket.emit('REQUEST_START_AGAIN', {
        id:  actions.user.id
      });
    }

    if(actions.isPlayWithComputer===true) {
      for (let i = 0; i < 400; i += 1) {
        $(`#buttonStart${i}`).removeClass('selectedButton');
      }
      for (let i = 0; i < history.length; i += 1) {
        $(`#button${i}`).removeClass('selectedButton');
      }
      $(`#button${step}`).addClass('selectedButton');
  
      onSetStep(step, step % 2 === 0);
    } 

    if(actions.isPlayWithAnother === true && step === history.length-2) {
      socket.emit('REQUEST_UNDO', {
        id:  actions.user.id
      });
     
    }


  }

  
  render() {
    
    const { actions } = this.props;
    const { history, stepNumber, isIncrease, xIsNext } = actions;
    const current = history[stepNumber];
    const winner = this.calculateWinner(current.squares);
    const moves = [];
    let username;

    socket.on('RECEIVE_REPLY_UNDO', data => {
      if (actions.user !== null) {
        // eslint-disable-next-line no-empty
        if (data.id === actions.partnerID && data.id !== null) {
          if(data.isAccept===true) {
            this.handleUnDo(actions.history.length-2);

          } else {
            swal(`${actions.partnerName} không đồng ý cho bạn chơi lại bước trước đó!`);
          }
        }
      }
    });

    if (actions.user === null) {
      console.log('null');
    } else {
      username = actions.user.username;
    }
    if (isIncrease === true ) {
      if(actions.isPlayWithComputer === true) {
        for (let i = 0; i < history.length; i += 1) {
          const desc = i ? `Đi tới bước thứ ${i}` : 'Bắt đầu lại từ đầu';
          moves.push(
            <div key={i}>
              <Button
                variant="success"
                style={{ width: '155px', marginTop: "5px" }}
                id={`button${i}`}
                onClick={() => this.jumpTo(i)}
              >
                {desc}
              </Button>
            </div>
          );
        }
      } 
      if(actions.isPlayWithAnother === true) {
        moves.push(
          <Button
            variant="success"
            style={{ width: '155px', marginTop: '5px' }}
            onClick={() => this.jumpTo(history.length-2)}
          >
            <image thumbnail src={BackImg} style={{height: "30px"}} />
            Undo
          </Button>
        );
      }

    } else if(actions.isPlayWithComputer === true) { 
        for (let i = history.length - 1; i >= 0; i -= 1) {
          const desc = i ? `Đi tới bước thứ ${i}` : 'Bắt đầu lại từ đầu';
          moves.push(
            <div key={i}>
              <Button
                variant="success"
                style={{ width: '155px' }}
                id={`button${i}`}
                onClick={() => this.jumpTo(i)}
              >
                {desc}
              </Button>
            </div>
          );
        }
      }
      
    

    let status;

    if (winner ) {
      status = `Xin chúc mừng, người chiến thắng là: ${winner}`;
    } else {
      status = `Lượt chơi tiếp theo: ${xIsNext ? 'X' : 'O'}`;
    }

    return (

    <div>
      <div className="row">
      <div className="col-md-9" />
      <div className="col-md-3">
        <div className="row">
        <div className="col-md-6">
        <Button variant="primary" style={{width: "150px"}} >
              Xin hòa
            </Button>
        </div>
        <div className="col-md-6">
        <Button variant="outline-danger"  style={{width: "150px"}} onClick={this.dauHang}>Đầu hàng</Button>
        </div>
        </div>
  
      </div>
    </div>

      <div className="row">
        <div className="col-md-9">
          <div className="row">
            <div className="d-flex justify-content-center col-md-9">
              <Board
                squares={current.squares}
                onClick={i => this.handleClick(i)}
              />
            </div>
            <div className="col-md-3">
              <div>{status}</div>
              <div>
                <Button
                  type="button"
                  variant="outline-primary"
                  onClick={() => {
                    const { onIncrease } = this.props;
                    onIncrease(!isIncrease);
                  }}
                >
                  Sắp xếp các bước đi
                </Button>
              </div>
              <div style={{ overflow: 'scroll', height: '80vh', marginTop: "10px" }}>
                <div>{moves}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div  id="msgAreID" style={{ overflow: 'scroll', height: '60vh' }} />

          <div>
            <Form onSubmit={this.doSendMessage}>
              <Form.Group controlId="sdf" style={{display: "none"}}>
                <Form.Control
                  type="text"
                  value={username}
                  readOnly
                  name="username"
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Enter your message</Form.Label>
                <Form.Control 
                  type="text"
                  placeholder="Enter your messgae"
                  name="message"
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Gửi
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
      
    );
  }
}

// ========================================
const mapStateToProps = state => {
  return {
    actions: state.games
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onHandleClick: (history, stepNumber, xIsNext) => {
      dispatch(actionss.squares(history, stepNumber, xIsNext));
    },
    onSetStep: (stepNumber, xIsNext) => {
      dispatch(actionss.steps(stepNumber, xIsNext));
    },
    onIncrease: isIncrease => {
      dispatch(actionss.increase(isIncrease));
    },
    onSetTurn: isTurn => {
      dispatch(actionss.SetTurn(isTurn));
    },
    onSetDauHang: isPartnerDauHang => {
      dispatch(actionss.setPartnerDauHang(isPartnerDauHang));
    },
    fetchCurrent: bindActionCreators(actionss.fetchCurrentUser, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Game));
