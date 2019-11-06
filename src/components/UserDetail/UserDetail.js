import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import fetch from 'cross-fetch';
import $ from 'jquery';
import { withRouter } from 'react-router-dom';
import * as actionss from '../../actions/index';
import {storage}  from "../../Firebase/index";

class UserDetail extends React.Component {
  constructor(props) {
    super(props);
    const { actions } = this.props;

    if (actions.user === null) {
      const { history } = this.props;
      history.push('/login');
    }
  }

  updateData = e=>{

    $('#idLoading').show();
    $('#successMsg').hide();
    e.preventDefault();
    const { actions, fetchCurrent } = this.props;
    const name = e.target.username.value;
    const passwordUser = e.target.password.value;
    let imgAvatar;
    imgAvatar = actions.user.ImgLink;

    Promise.resolve(

    ).then(() => {

    })
    const image = this.fileUpload.files[0];
    if(image!=null) {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        snapshot => {
          // progress function ...
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          if(progress===100) {
            $('#idLoading').hide();
            $('#successMsg').show();
          }
        },
        error => {
          // Error function ...
          console.log(error);
        },
        () => {
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then(url => {
              imgAvatar = url;
              fetch(`https://jwtduyhau.herokuapp.com/user/update`, {
                method: 'POST',
                body: JSON.stringify({
                  id: actions.user.id,
                  username: name,
                  password: passwordUser,
                  ImgLink: imgAvatar
              }),
              headers: {
                  "content-type": "application/json; charset=UTF-8"
              }
            })
                .then(
                  response => console.log(response),
          
                )
                .catch((error) => {
                  console.log('An error occurred.', error)
                });
            });
        }
      );
    } else {
      fetch(`https://jwtduyhau.herokuapp.com/update`, {
                method: 'POST',
                body: JSON.stringify({
                  id: actions.user.id,
                  username: name,
                  password: passwordUser,
                  ImgLink: imgAvatar
              }),
              headers: {
                  "content-type": "application/json; charset=UTF-8"
              }
            })
                .then( 
                  response => console.log(response),
          
                )
                .catch((error) => {
                  console.log('An error occurred.', error)
                });
                $('#idLoading').hide();
                $('#successMsg').show();
                fetchCurrent();
    }
    

  }
  
  displayImg= e => {

    e.preventDefault();
    const image = e.target.files[0];
    // eslint-disable-next-line prefer-const
    let reader = new FileReader();
    reader.onload = function (ev) {
        $('#idImg')
            .attr('src', ev.target.result)
            .width(200)
            .height(200).show();
    };
    reader.readAsDataURL(image);
  }

  render() {
    const { actions } = this.props;

    let username ;
    let password;
    let imglink;
    if(actions.user!==null) {
      username = actions.user.username;
      password =actions.user.password;
      imglink = actions.user.ImgLink
    }

    return (
      <div className="container">
        <div className="d-flex justify-content-center">
          <img
            id="idImg"
            src={imglink}
            style={{ width: '30vw', height: '30vh' }}
            alt="Avatar"
          />
        </div>
        <Form onSubmit={this.updateData}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Thay đổi avatar: </Form.Label>
            <Form.Control
              // eslint-disable-next-line no-return-assign
              ref={ref => (this.fileUpload = ref)}
              onChange={this.displayImg}
              type="file"
              placeholder="Enter username"
              name="ImgAvatar"
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Tên tài khoản:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              name="username"
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Mật khẩu:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              name="password"
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword" style={{ display: 'none' }}>
            <Form.Label>Nhập lại mật khẩu:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Rytype Password"
              name="retypepassword"
            />
          </Form.Group>
          <div className="d-flex justify-content-center">
            <Button
              style={{ textAlign: 'center' }}
              id="idSubmit"
              variant="primary"
              type="submit"
            >
              Chỉnh sửa thông tin
            </Button>


          </div>
          <div className="d-flex justify-content-center">
          <div
              id="idLoading"
              style={{ display: 'none' }}
              className="spinner-border text-success"
            />
          </div>
          <div className="d-flex justify-content-center">
          <div
              id="successMsg"
              style={{ display: 'none', color: 'green', textAlign: 'center' }}
            >
              Chỉnh sửa thành công!
            </div>
          </div>
        </Form>
        <div
          className="error"
          id="errorMsg"
          style={{ display: 'none', color: 'red', textAlign: 'center' }}
        >
          Xin vui lòng nhập lại mật khẩu giống với mật khẩu đã nhập
        </div>
        <div
          className="error"
          id="errorMsgSer"
          style={{ display: 'none', color: 'red', textAlign: 'center' }}
        >
          Có lỗi xảy ra
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) =>{
  return {
  actions: state.games
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onHandleClick: (history, stepNumber, xIsNext) =>{
      dispatch(actionss.squares(history, stepNumber, xIsNext));
    },
    onSetStep: (stepNumber, xIsNext) =>{ dispatch(actionss.steps(stepNumber, xIsNext))
    },
    onIncrease: (isIncrease) => {dispatch(actionss.increase(isIncrease))},
    fetchCurrent: bindActionCreators(actionss.fetchCurrentUser,dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserDetail))
