import React from "react";
import { Card, Button } from "antd";
import "./index.css";

export class Pricingitem extends React.Component {

  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    this.setState()
    if (localStorage.getItem('admin') == 500 ) {
      window.location.href='/login';
    } else {
      window.location.href='/dentist';
    }
  }

  render() {
    return (
      <div className="">
        <Card
          bodyStyle={{
            backgroundColor: "#00d563",
            color: "white",
            textAlign: "center"
          }}
          style={{ width: 330 }}
        >
          <strong>{this.props.title}</strong>
          <p>
            EUR<span className="price">{this.props.price}</span>
          </p>
          <p>{this.props.products}</p>
          <p>{this.props.downloads}</p>
          <p>{this.props.capacity}</p>

          <Button className="button" onClick={this.handleClick.bind(this)}>
            <strong>Subscribe</strong>
          </Button>
        </Card>
      </div>
    );
  }
}
