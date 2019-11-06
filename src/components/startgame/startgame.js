import React from 'react';
import { Button, Row, Col, Container, Image } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import $ from 'jquery';
import * as actionss from '../../actions/index';
import {socket} from '../../helpers/helper' ;
import Robot from '../../assets/images/robot.png';
import People from '../../assets/images/people.jpg';

class StartGame extends React.Component {
  
  
  constructor(props) {
    super(props);
    const {actions} = this.props;
    
    const { history,  fetchCurrent} = this.props;
    fetchCurrent();
    if(actions.user === null) {   
      history.push('/login');     
    }

  }


  playWithComputer = () =>{

    const {onPlayWithComputer, onHandleClick} = this.props;
    Promise.resolve(
      onPlayWithComputer(true),
      onHandleClick([{
        squares: Array(400).fill(null)
      }], 0, false)
    ).then(() => {
      const {history} = this.props;
      history.push('/game');
    })
  }

  playWithPeople = () =>{
    $('#isFinding').show();
    const {actions} = this.props;
    const {onPlayWithComputer, onHandleClick, onFindAnother, onPlayWithAnother, history, onSetPartner} = this.props;
    onPlayWithComputer(false);
    onPlayWithAnother(true);
    onFindAnother(true);
    onHandleClick([{
      squares: Array(400).fill(null)
    }], 0, false);
  
    console.log(actions.UserPlayedID);
  if(actions.UserPlayedID!==actions.user.id&&actions.UserPlayedID!==null) {
    if(actions.UserPlayedID!==actions.user.id&&actions.UserPlayedID!==null&&actions.user.id!=null&&actions.isWaiting ===true) {
  
      Promise.resolve(
        onSetPartner(actions.UserPlayedID, actions.UserPlayedName),
        onPlayWithAnother(true),
        onFindAnother(false),
      ).then(() => {

        history.push('/game');
        $('#isFinding').hide();
      })


  } 

  }


  socket.emit('FIND_ANOTHER', {
    id: actions.user.id,
    name: actions.user.username
});

    
  }

    render() {
      const {actions} = this.props;
      const {onPlayWithAnother, onFindAnother, history, onSetPartner, onSetUserPlayed} = this.props;
      socket.on('RECEIVE_FIND_ANOTHER', function(data){


        if(actions.user!==null) {

          if(actions.partnerID!==data.id) {
            onSetUserPlayed(data.id, data.name);
          }
          if(data.id!==actions.user.id&&data.id!==null&&actions.user.id!=null&&actions.isWaiting ===true) {
  
              onSetPartner(data.id, data.name);
         
              onPlayWithAnother(true);
              onFindAnother(false);
              history.push('/game');
              $('#isFinding').hide();
          } else {
            onFindAnother(true);
          }
        }
        

  
    });


        return (
          <Container>
            <Row>
              <Col xs={6} md={6}>

              <Button variant="primary" type="button" onClick={this.playWithComputer} >
              <Image src={Robot} thumbnail style={{height: "40vh"}}/>
              Chơi với máy
              </Button>
              </Col>
              <Col xs={6} md={6}>
                
              <Button variant="primary" type="button" onClick={ () => this.playWithPeople()} >
              <Image src={People} thumbnail style={{height: "40vh"}} />
              Tìm người chơi
          </Button>
              </Col>
            </Row>
            <Row  className="d-flex justify-content-center" style={{textAlign: "center", marginTop: "100px", fontSize: "26px", color: "blue"}}>
              <p id="isFinding" style={{display: "none"}}> Đang tìm trận, xin vui lòng đợi chút</p>
            </Row>
          </Container>
          
          

        );
      }


    

  }
  
  // ========================================
  const mapStateToProps = (state) =>{
    return {
    actions: state.games
    }
  };
 
  const mapDispatchToProps = (dispatch) => {
    return {
      onPlayWithComputer: (isPlayWithComputer) =>{
        dispatch(actionss.playWithComputer(isPlayWithComputer));
      },
      onPlayWithAnother: (isPlayWithAnother) =>{
        dispatch(actionss.playWithAnother(isPlayWithAnother));
      },
      onFindAnother: (isWaiting) =>{
        dispatch(actionss.FindAnother(isWaiting));
      },
      onHandleClick: (history, stepNumber, xIsNext) =>{
        dispatch(actionss.squares(history, stepNumber, xIsNext));
      },
      onSetPartner: (partnerID, partnerName) =>{
        dispatch(actionss.setPartnerID(partnerID, partnerName));
      },
      onSetUserPlayed: (userPlayed, userPlayedName) =>{
        dispatch(actionss.setUserPlayedID(userPlayed, userPlayedName));
      },
      fetchCurrent: bindActionCreators(actionss.fetchCurrentUser,dispatch)
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(withRouter(StartGame))
