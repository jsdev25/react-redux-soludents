
import React from 'react';
import { Carousel } from 'antd'
import './index.css'

export class MainCarousel extends React.Component {
  render() {
    return(
      <div className="container-fluid" style={{margin:0,padding:0}}>
       
       <Carousel autoplay>
          <div className="ProfileHeadCard" >
              <div className="ProfileHeadCard__head hero-image1">
                <p style={{fontSize:50,color:'#fff'}}>Lorem ipsum dolor sit amet,consectetur adipiscing elit, sed</p>
              </div>
          </div>
          
          <div className="ProfileHeadCard" >
              <div className="ProfileHeadCard__head hero-image2">
                <p style={{fontSize:50,color:'#fff'}}>Hello How are you? adipiscing elit, sed</p>
              </div>
          </div>

          <div className="ProfileHeadCard">
              <div className="ProfileHeadCard__head hero-image3">
                <p style={{fontSize:50,color:'#fff'}}>Very Well Thanks ,consectetur adipiscing elit, sed</p>
              </div>
          </div>
        </Carousel>


      </div>
    );
  }
}
