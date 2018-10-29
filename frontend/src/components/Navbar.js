import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authentication';
import { withRouter } from 'react-router-dom';
import { Menu, Dropdown, Icon } from 'antd';

const menu = (
    <Menu>
      <Menu.Item>
        <Link className="nav-link" to="/login">Admin</Link>
      </Menu.Item>
      <Menu.Item>
        <Link className="nav-link" to="/logindentist">Dentist</Link>
      </Menu.Item>
      <Menu.Item>
        <Link className="nav-link" to="/loginoperator">Operator</Link>
      </Menu.Item>
    </Menu>
  );

  const menu_list = (
    <Menu>
      <Menu.Item>
        <a href="#header">Header</a>
      </Menu.Item>
      <Menu.Item>
        <a href="#video">Video</a>
      </Menu.Item>
      <Menu.Item>
        <a href="#choose">package</a>
      </Menu.Item>
      <Menu.Item>
        <a href="#team">Team</a>
      </Menu.Item>
      <Menu.Item>
        <a href="#contact">Contact</a>
      </Menu.Item>
    </Menu>
  );

class Navbar extends Component {

    onLogout(e) {
        e.preventDefault();
        this.props.logoutUser(this.props.history);
        localStorage.setItem("admin",500)
    }

    render() {
        const {isAuthenticated, user} = this.props.auth;
        console.log("=======================", localStorage.getItem('UserAdmin'));
        const authLinks = (
            <ul className="navbar-nav ml-auto">
                <a href="" className="nav-link" onClick={this.onLogout.bind(this)}>
                   
                            Logout
                </a>
            </ul>
        )
      const guestLinks = (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <Link className="nav-link" to="/register">Sign Up</Link>
            </li>
            <li className="nav-item">
                <Dropdown overlay={menu}>
                  <Link className="nav-link" to="#">Sign In</Link>
                </Dropdown>
            </li>
        </ul>
      )
        return(
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
             
                <Dropdown overlay={menu_list}>
                  <Link className="nav-link" to="#"><Icon  style={{ fontSize: '32px'}} type="align-left" theme="outlined" /></Link>
                </Dropdown>
                <Link className="navbar-brand" to="/">
                  <img src="https://seeklogo.com/images/F/free-delivery-logo-3F8F5B428D-seeklogo.com.png" style={{width:80,height:40}} />
                </Link>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {isAuthenticated ? authLinks : guestLinks}
                </div>
            </nav>
        )
    }
}
Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(withRouter(Navbar));