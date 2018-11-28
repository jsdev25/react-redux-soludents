import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { registerUser } from "../actions/authentication";
import classnames from "classnames";
import { Row, Col, message, Modal, Checkbox } from "antd";
import { Link } from "react-router-dom";

function info() {
  Modal.info({
    title: "Termes et Conditions",
    content: "some messages...some messages..."
  });
}

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      lastname: "",
      address: "",
      adli_number: "",
      phone: "",
      email: "",
      password: "",
      password_confirm: "",
      admin: "",
      checkbox: false,
      errors: {}
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }

  handleCheck(e) {
    this.setState({
      checkbox: e.target.checked
    });
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    if (this.state.password !== this.state.password_confirm) {
      message.error("Les mots de passes ne sont pas identiques !");
      return false;
    }

    if (!this.state.checkbox) {
      message.info("Veuillez accepter les termes et conditions");
      return false;
    }

    e.preventDefault();
    const user = {
      name: this.state.name,

      lastname: this.state.lastname,
      address: this.state.address,
      phone: this.state.phone,
      adli_number: this.state.adli_number,
      email: this.state.email,
      password: this.state.password,
      subscription: 1,
      admin: 0
    };
    this.props.registerUser(user, this.props.history);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/");
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <div>
        <Link to="/">
          <img
            src="https://cdn.icon-icons.com/icons2/209/PNG/128/go-back256_24856.png"
            width="50"
            height="50"
            alt="Retourner à l'Accueuil"
            style={{ margin: 30 }}
          />
        </Link>
        <div
          className="container"
          style={{ marginTop: "50px", width: "700px" }}
        >
          <h2 style={{ marginBottom: "40px" }}>Inscription</h2>
          <div className="form-group">
            <input
              type="text"
              placeholder="Prénom"
              className={classnames("form-control form-control-lg", {
                "is-invalid": errors.name
              })}
              name="name"
              onChange={this.handleInputChange}
              value={this.state.name}
            />
            {errors.name && (
              <div className="invalid-feedback">{errors.name}</div>
            )}
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Nom de famille"
              className={classnames("form-control form-control-lg", {
                "is-invalid": errors.lastname
              })}
              name="lastname"
              onChange={this.handleInputChange}
              value={this.state.lastname}
            />
            {errors.lastname && (
              <div className="invalid-feedback">{errors.lastname}</div>
            )}
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              className={classnames("form-control form-control-lg", {
                "is-invalid": errors.email
              })}
              name="email"
              onChange={this.handleInputChange}
              value={this.state.email}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Mot de Passe"
              className={classnames("form-control form-control-lg", {
                "is-invalid": errors.password
              })}
              name="password"
              onChange={this.handleInputChange}
              value={this.state.password}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirmation Mot de Passe"
              className={classnames("form-control form-control-lg", {
                "is-invalid": errors.password_confirm
              })}
              name="password_confirm"
              onChange={this.handleInputChange}
              value={this.state.password_confirm}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>

          <div className="form-group">
            <input
              type="text"
              placeholder="Téléphone"
              className={classnames("form-control form-control-lg", {
                "is-invalid": errors.phone
              })}
              name="phone"
              onChange={this.handleInputChange}
              value={this.state.phone}
            />
            {errors.phone && (
              <div className="invalid-feedback">{errors.phone}</div>
            )}
          </div>

          <div className="form-group">
            <input
              type="text"
              placeholder="Numéro Adeli"
              className={classnames("form-control form-control-lg", {
                "is-invalid": errors.adli_number
              })}
              name="adli_number"
              onChange={this.handleInputChange}
              value={this.state.adli_number}
            />
            {errors.adli_number && (
              <div className="invalid-feedback">{errors.adli_number}</div>
            )}
          </div>

          <div className="form-group">
            <input
              type="text"
              placeholder="Adresse"
              className={classnames("form-control form-control-lg", {
                "is-invalid": errors.address
              })}
              name="address"
              onChange={this.handleInputChange}
              value={this.state.address}
            />
            {errors.address && (
              <div className="invalid-feedback">{errors.address}</div>
            )}
          </div>

          <span>
            <Checkbox
              checked={this.state.checkbox}
              onChange={this.handleCheck}
            />
            <span onClick={info} style={{ cursor: "pointer" }}>
              Termes et Conditions
            </span>
          </span>

          <div className="form-group" style={{ marginTop: 15 }}>
            <Row gutter={12}>
              <Col span={12}>
                <Link to="/login">
                  <button
                    className="btn btn-danger"
                    style={{ width: "100%", backgroundColor: "#ce2828" }}
                  >
                    <strong style={{ fontSize: 20 }}>Annuler</strong>
                  </button>
                </Link>
              </Col>

              <Col span={12}>
                <button
                  onClick={this.handleSubmit}
                  className="btn btn-success"
                  style={{ width: "100%", backgroundColor: "#00d563" }}
                >
                  <strong style={{ fontSize: 20 }}>S'inscrire</strong>
                </button>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
