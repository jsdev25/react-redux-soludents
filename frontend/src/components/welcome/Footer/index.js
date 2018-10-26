import React from 'react';
import {Row,Col} from 'antd'
import './index.css';

export class Footer extends React.Component {
  render() {
    return(
      <div className="container-fluid">
        <Row className="footer-view" >
            
            <Col md={8} xs={24}>
                <div className="mb-5">
                <h1 className="text-black">
                    <strong>Logo</strong>
                </h1>
                <br/>
                <div style={{paddingRight:30}}>
                    <p>Quite a few companies decided to create watches on their own to compete with the tech giants in the smart watch industry versions&smart watches.</p>
                </div>
                </div>
            </Col>

            <Col md={4} xs={24}>
                <div className="mb-5">
                <h3 className="text-black">
                    <strong>product</strong>
                </h3>
                <br/>
                <p>Popular</p>
                <p>Trending</p>
                <p>Catalog</p>
                <p>Features</p>
                </div>
            </Col>

            <Col md={4} xs={24}>
                <div className="mb-5">
                <h3 className="text-black">
                    <strong>company</strong>
                </h3>
                <br/>
                <p>Pross Rokosos</p>
                <p>Misskon</p>
                <p>Strategy</p>
                <p>Works</p>
                </div>
            </Col>

            <Col md={4} xs={24}>
                <div className="mb-5">
                <h3 className="text-black">
                    <strong>Info</strong>
                </h3>
                <br/>
                <p>Support</p>
                <p>Developers</p>
                <p>Service</p>
                <p>Ger Started</p>
                </div>
            </Col>


            <Col md={4} xs={24}>
                <div className="mb-5">
                <h3 className="text-black">
                    <strong>Follow us</strong>
                </h3>
                <br/>
                <span className={'icmn icmn-facebook'} style={{color:'#323232',fontSize:35,marginLeft:5}}/>
                <span className={'icmn icmn-twitter'} style={{color:'#323232',fontSize:35,marginLeft:20}}/>
                <span className={'icmn icmn-linkedin2'} style={{color:'#323232',fontSize:35,marginLeft:20}}/>
                </div>
            </Col>
            </Row>
      </div>
    );
  }
}
