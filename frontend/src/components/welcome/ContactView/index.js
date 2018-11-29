import React, { Component } from "react";
import { Button, Input, message } from "antd";
import { messageSend } from "../../../actions/authentication";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import "./index.css";
import axios from "axios"

const { TextArea } = Input;
class Contactview extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      html: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onhandleSendMessage = this.onhandleSendMessage.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onhandleSendMessage() {
   /*  if (!this.state.html) {
      message.error("Please input your content.");
      return false;
    } */
    const {email,html} = this.state
    axios.post(
      `api/emails/send`,{
        email,
        html   
      }
    ).then(
      ({data}) => {
        alert('Yoir mail has been sent successfully')
      }
    )
    
    /* this.props.messageSend(message_data, this.props.history); */
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="contact-view">
          <h1 className="text-white">
            <strong>Contactez Nous !</strong>
          </h1>

          <h4 style={{ float: "left", marginTop: 50 }} className="text-white">
            E-mail
          </h4>
          <Input
            placeholder="E-mail address"
            value={this.state.email}
            name="email"
            onChange={this.handleInputChange}
          />

          
          <h4 style={{ float: "left", marginTop: 50 }} className="text-white">
            Comment pouvons-nous vous aider ?
          </h4>
          <TextArea
            rows={4}
            name="html"
            onChange={this.handleInputChange}
            value={this.state.html}
          />

          <Button
            style={{ marginTop: 70, borderRadius: 20 }}
            onClick={this.onhandleSendMessage}
          >
            Envoyez votre message
          </Button>
        </div>
      </div>
    );
  }
}

Contactview.propTypes = {
  messageSend: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { messageSend }
)(withRouter(Contactview));
