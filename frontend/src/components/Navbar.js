import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authentication";
import { withRouter } from "react-router-dom";
import HorizontalNavbar from "./Navbar/horizontalNavbar";
import VerticalNavbar from "./Navbar/verticalNavbar";

class Navbar extends Component {
  constructor() {
    super();
    this.goPanel = this.goPanel.bind(this);
  }

  goPanel() {
    if (localStorage.getItem("admin") === 2) {
      window.location.href = "/admin";
    } else if (localStorage.getItem("admin") === 1) {
      window.location.href = "/operator";
    } else {
      window.location.href = "/dentist";
    }
  }

  onLogout(e) {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
    localStorage.setItem("admin", 500);
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <a className="nav-link" onClick={this.goPanel.bind(this)}>
          Mon Compte
        </a>

        <a href="" className="nav-link" onClick={this.onLogout.bind(this)}>
          Se déconnecter
        </a>
      </ul>
    );
    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            S'inscrire
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Se connecter
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <VerticalNavbar />
        <Link className="navbar-brand" to="/">
          <img
            src="https://i.imgur.com/HhAxynm.jpg"
            alt="Smiley face"
            width="120"
            height="50"
          />
        </Link>

        <HorizontalNavbar />

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </nav>
    );
  }
}
Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(withRouter(Navbar));
