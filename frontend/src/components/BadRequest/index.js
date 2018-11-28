import React, { Component } from "react";
import { Link } from "react-router-dom";

class Error extends Component {
  render() {
    return (
      <div>
        <img
          style={{ height: "100vh", width: "100%" }}
          src="https://issues.jboss.org/secure/attachment/12387931/404-page-04.png"
          alt="Retourner à l'Accueuil"
        />
        <Link
          to="/"
          style={{ position: "absolute", left: 20, top: 20, fontSize: 22 }}
        >
          Retourner à la page d'accueuil
        </Link>
      </div>
    );
  }
}

export default Error;
