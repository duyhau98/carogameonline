import React from 'react';
import { Button, Navbar, Nav, Form, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as action from '../../actions/index';
// import styles from './navbar.module.css';

// eslint-disable-next-line react/prefer-stateless-function
class navbar extends React.Component {



  render() {
    const {actions} = this.props;

    if(actions.user===null) {
      return (
        <Navbar bg="dark"  variant="dark">

          <Nav className="mr-auto">
            <Nav.Link  to="/register" ><Link key='2' style={{ color: "#b3d7ff"}}   to="/register">Đăng ký</Link></Nav.Link>
            <Nav.Link > <Link key='3' style={{ color: "#b3d7ff"}}   to="/login">Đăng nhập</Link></Nav.Link>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-info">Search</Button>
          </Form>
        </Navbar>
      );
    }

    return  (
      <Navbar bg="dark"  variant="dark">
      <Navbar.Brand ><Link key='1'  style={{ color: "#b3d7ff"}}  to="/">Chọn kiểu chơi</Link></Navbar.Brand>

      <Nav className="mr-auto">
      <Nav.Link > <Link key='2'  style={{ color: "#b3d7ff"}}   to="/game">Phòng Game</Link></Nav.Link>
      <Nav.Link > <Link key='2'  style={{ color: "#b3d7ff"}}   to="/userdetail">Thông tin cá nhân</Link></Nav.Link>
        <Nav.Link > <Link key='3'  style={{ color: "#b3d7ff"}}   to="/logout">Đăng xuất</Link></Nav.Link>
      </Nav>
      <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-info">Search</Button>
      </Form>
    </Navbar>
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
    fetchCurrent: bindActionCreators(action.fetchCurrentUser,dispatch)
  }
}

export default  connect(mapStateToProps, mapDispatchToProps)(navbar);
