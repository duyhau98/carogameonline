import React from 'react';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import $ from 'jquery';
import { connect } from 'react-redux';
import { fetchPostsLogin, fetchCurrentUser } from '../../actions/index';


class Login extends React.Component {
  constructor(props) {
    
    super(props);

    const {actions} = this.props;

    if(actions.user !== null) {   
      const {history} = this.props;
      history.push('/');
    }  

  }


  handleSubmit = e => {
    $('#idLoading').show();
    e.preventDefault();
    const { fetchSubmit, fetchCurrent } = this.props;
    Promise.resolve(
      fetchSubmit(e.target.username.value, e.target.password.value),
      fetchCurrent(),
    ).then(() => {
      const { actions, userLogin } = this.props;
      if(userLogin.isFetching===false) {
        if(actions.user===null) {
          $('#errorMsg').show();
        } else {
          const {history} = this.props;
          
          history.push('/');
          $('#idLoading').hide();
        }
      } 

    })


  };

  render() {


      return (
    
        <div className="container">
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter username" name="username" />
              <Form.Text className="text-muted">
                We&apos;ll never share your account with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" placeholder="Password" />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <div className="d-flex justify-content-center">
            <Button variant="primary" type="submit">
              Đăng nhập
            </Button>
            </div>
          </Form>
          <div className='error' id="errorMsg" style={{display: "none", color: "red", textAlign: "center"}} >Nhập sai tên đăng nhập hoặc mật khẩu, xin vui lòng kiếm tra lại!</div>
          <div className="d-flex justify-content-center">
          <div
              id="idLoading"
              style={{ display: 'none' }}
              className="spinner-border text-success"
            />
          </div>
        </div>
      );




}
    


  
}

const mapStateToProps = (state) =>{
  return {
  userLogin: state.login,
  actions: state.games
  }
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchSubmit: fetchPostsLogin,
      fetchCurrent: fetchCurrentUser
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Login));
