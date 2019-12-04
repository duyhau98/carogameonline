import React from 'react';
import { Button, Form } from 'react-bootstrap';
import fetch from 'cross-fetch'
import $ from 'jquery';
import { withRouter } from 'react-router-dom';

class Register extends React.Component {
  
  doRegister = e =>{
    e.preventDefault();
    if(e.target.password.value!==e.target.retypepassword.value || e.target.password.value ==='') {
      $('#errorMsg').show();
    } else {
      $('#errorMsg').hide();

      fetch(`https://jwtduyhau.herokuapp.com/user/register`, {
        method: 'POST',
        body: JSON.stringify({
            username: e.target.username.value,
            password: e.target.password.value
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then(
          response => response.json(),

          error => console.log('An error occurred.', error)
        )
        .then(json =>
        {
            if(json!=null) {
              const {history} = this.props;
              history.push('/login');
            } else {
              $('#errorMsgSer').show();
            }

        }
        )
    }
  }


  render() {
    return(
      <div className="container">
      <Form onSubmit={this.doRegister}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter username" name="username" />
          <Form.Text className="text-muted">
            We&apos;ll never share your account with anyone else.
          </Form.Text>
        </Form.Group>
  
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" name="password" />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Retype password</Form.Label>
          <Form.Control type="password" placeholder="Rytype Password" name="retypepassword" />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <div className='error' id="errorMsg" style={{display: "none", color: "red", textAlign: "center"}} >Xin vui lòng nhập lại mật khẩu giống với mật khẩu đã nhập</div>
      <div className='error' id="errorMsgSer" style={{display: "none", color: "red", textAlign: "center"}} >Có lỗi xảy ra</div>
    </div>
    );
  }
}


export default withRouter(Register);
