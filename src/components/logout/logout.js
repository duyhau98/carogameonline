import React from 'react';
import { Redirect } from 'react-router';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { socket } from '../../helpers/helper';
import * as action from '../../actions/index';

// eslint-disable-next-line react/prefer-stateless-function
class Logout extends React.Component {

  constructor(props) {
    super(props);
    socket.disconnect();
    const {logOut} = this.props;
      logOut() 
        const {history} = this.props;
        history.push('/login');

  }

 
  
  render() {

    return(
       <Redirect to='/login'/>
    );
  }
}

const mapStateToProps = (state) =>{
  return {
  actions: state.games
  }
};

const mapDispatchToProps = (dispatch) => 
bindActionCreators(
  {
    fetchCurrent: action.fetchCurrentUser,
    logOut: action.logOut
  },
  dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Logout))

