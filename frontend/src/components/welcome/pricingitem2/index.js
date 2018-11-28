import React from "react";
import { Card, Button } from "antd";
import "./index.css";

export class Pricingitem2 extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState();
    if (localStorage.getItem("admin") === 500) {
      window.location.href = "/login";
    } else {
      window.location.href = "/dentist";
    }
  }

  render() {
    return (
      <div className="">
        <Card
          bodyStyle={{
            backgroundColor: "#139313",
            color: "white",
            textAlign: "center"
          }}
          className="mobile-price-view"
        >
          <strong>{this.props.title}</strong>
          <p>
            EUR<span className="price">{this.props.price}</span>
          </p>
          <p>{this.props.products}</p>
          <p>{this.props.downloads}</p>
          <p className="capacity2">{this.props.capacity}</p>

          <Button className="button" onClick={this.handleClick.bind(this)}>
            <strong>S'abonner</strong>
          </Button>
        </Card>
      </div>
    );
  }
}
