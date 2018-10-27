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
                    <img src={localStorage.getItem('avatar')} alt={user.name} title={user.name}
                        className="rounded-circle"
                        style={{ width: '25px', marginRight: '5px'}} />
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
                <Link className="navbar-brand" to="/">Company Logo</Link>
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