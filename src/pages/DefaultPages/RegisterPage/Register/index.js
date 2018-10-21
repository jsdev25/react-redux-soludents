import React from 'react'
import { Divider,Carousel ,Row,Col,Card,Input,Button,Modal} from 'antd'
import PricingItem from 'components/CleanComponents/PricingItem'
import Slider from "react-slick";
import './style.scss'
const { Meta } = Card;
const { TextArea } = Input;

class Register extends React.Component {
  state = {
    backgroundImage: 'url(resources/images/login/1.jpg)',
    fullSize: true,
    hidden:true,
    visible:true
  }

  showModal = () => {
    this.setState({
      hidden:true,
      visible:true
    });
    alert('hello')
  }

  generateBackground = () => {
    let { backgroundImage } = this.state

    let min = 1
    let max = 5
    let picNumber = Math.floor(Math.random() * (max - min + 1)) + min
    backgroundImage = 'url(resources/images/login/' + picNumber + '.jpg)'
    this.setState({
      backgroundImage: backgroundImage,
    })
  }

  switchSize = () => {
    let { fullSize } = this.state
    fullSize = !fullSize
    this.setState({
      fullSize: fullSize,
    })
  }

  componentDidMount() {
    document.getElementsByTagName('body')[0].style.overflow = 'hidden'
  }

  componentWillUnmount() {
    document.getElementsByTagName('body')[0].style.overflow = ''
  }

  render() {
    const { backgroundImage, fullSize } = this.state;

    const settings = {
      className: "center",
      centerMode: true,
      infinite: true,
      centerPadding: "15px",
      slidesToShow: 5,
      speed: 500
    };

    return (
      <div
        className={fullSize === false ? 'login' : 'login login--fullscreen'}
        // style={{ backgroundImage: backgroundImage }}
      > 
        <div className="login__header">
          <div className="row">
            <div className="col-lg-8">
              <div className="login__header__logo">
                <a href="javascript: void(0);">
                  <img
                    src="resources/images/login/logo-inverse.png"
                    alt="Clean UI Admin Template"
                  />
                </a>
                
                {/* <Button className="ml-3" onClick={this.generateBackground}>
                  Randomize Background Image
                </Button> */}
              </div>
            </div>
            <div className="col-lg-4">
              <div className="login__header__menu">
                <ul className="list-unstyled list-inline">
                  <li className="list-inline-item">
                    <a href="javascript: void(0);">&larr; Back</a>
                  </li>
                  <li className="list-inline-item active">
                    <a href="/login">Login</a>
                  </li>
                  <li className="list-inline-item">
                    <a href="javascript: void(0);">About</a>
                  </li>
                  <li className="list-inline-item">
                    <a href="javascript: void(0);">Support</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="ProfileHeadCard" style={{backgroundColor:'red'}}>
            <div className="ProfileHeadCard__head hero-image">
              <h2 className="text-white">
                <strong>222222222222222222222222222222222222222222222222222222</strong>
              </h2>
            </div>
        </div> */}

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

        <Row gutter={48} style={{padding:0,margin:0,marginTop:40}}>

          <Col span={12} style={{height:570}}>
              <iframe style={{width:'100%',height:'100%'}}
                      src="https://www.youtube.com/embed/zYpb_4rcWl4" frameborder="0" allowfullscreen=""
                      id="_dytid_3140">
              </iframe>
          </Col>

          <Col span={12}  >
            <div style={{marginTop:'20%',padding:'6%'}}>
              <span style={{fontSize:40}}>We help build trust with design</span>
              <br/>
              <span style={{fontSize:14}}>We are passionate about creating adaptive designs that will improve your digital presence and will increase the retention rate and trust of your website visitors.</span>
            </div>
          </Col>
        </Row>

      
        <div className="login__block">
          <div className="row">
            <div className="col-xl-12">
              <div className="login__block__promo text-dark text-center">
                <h1>
                  <strong>Choose your package</strong>
                </h1>
                <center><Divider style={{height:5,backgroundColor:'#00d563',width:'9%'}}/></center>
                <span>But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth</span>
            </div>
          </div>
        </div>
        </div>

         <div className="pricing-table" style={{marginTop:-70,paddingLeft:'10%',paddingRight:'10%'}}>
          <PricingItem type="success" extended={true} />
          <PricingItem type="success" extended={true}/>
          <PricingItem type="success" extended={true}/>
        </div>

        <Row gutter={48} style={{padding:0,marginLeft:'10%',marginRight:'10%',marginTop:40}}>

          <Col span={4} xs={24} md={4}>
            <center><img alt="example" src="http://support.jnf.org/images/content/pagebuilder/Tu-BiShvat.jpg" width="200" style={{marginTop:20}}/></center>
          </Col>

          <Col span={4} md={4} xs={24}>
            <center><img alt="example" src="https://i.pinimg.com/originals/a6/3f/7e/a63f7e9d12d2daae5b621bd230924330.jpg" width="200" style={{marginTop:20}}/></center>
          </Col>

          <Col span={4} md={4} xs={24}>
            <center><img alt="example" src="https://www.handinhandk12.org/sites/handinhand/files/handinhand_logo.png" style={{marginTop:20}} width="200"/></center>
          </Col>

          <Col span={4} md={4} xs={24}>
            <center><img alt="example" src="http://www.dsip.co.il/images/logo.png" style={{marginTop:20}} width="200"/></center>
          </Col>

          <Col span={4} md={4} xs={24}>
            <center><img alt="example" src="https://nftyisrael.org/wp-content/uploads/sites/40/2015/11/nfty-israel-logo.jpg" style={{marginTop:20}} width="200"/></center>
          </Col>

          <Col span={4} md={4}  xs={24}>
            <center><img alt="example" src="http://www.ipr.gov.ba/img/w/825/upload/images/logo_tm_view.jpg" style={{marginTop:20}} width="200"/></center>
          </Col>

        </Row>
        

        <div className="login__block">
          <div className="row">
            <div className="col-xl-12">
              <div className="login__block__promo text-dark text-center">
                <h1 className="mb-3">
                  <strong>Our Team</strong>
                </h1>
                <center><Divider style={{height:5,backgroundColor:'#00d563',width:'9%'}}/></center>
                <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</span>
            </div>
          </div>
        </div>

       <Slider {...settings} gutter={70}>
          
            <Card
                hoverable
                bodyStyle={{backgroundColor:'#00d563',color:'#fff'}}

                cover={<img alt="example" src="http://webcom.colostate.edu/china/files/2016/05/Tang-Wenyuan-profile-photo.jpg" />}
              >
                <div style={{textAlign:'center'}}>
                  <span style={{fontSize:16,fontWeight:'500'}}>Name Surname</span>
                  <br/>
                  <span>Co- Jar man</span>
                </div>
            </Card>
            <Card
                hoverable
                bodyStyle={{backgroundColor:'#00d563',color:'#fff'}}

                cover={<img alt="example" src="https://d1o51r9qdgnnlz.cloudfront.net/profile/profile_mike-030d0469-9e74-48da-914f-71d17aaedca7.png" />}
              >
               <div style={{textAlign:'center'}}>
                  <span style={{fontSize:16,fontWeight:'500'}}>Name Surname</span>
                  <br/>
                  <span>Co- Jar man</span>
                </div>
            </Card>
            <Card
                hoverable
                bodyStyle={{backgroundColor:'#00d563',color:'#fff'}}

                cover={<img alt="example" src="https://www.washingtonpost.com/resizer/veyZTpsvZ05rhrkBm01wkhxKgj4=/200x200/s3.amazonaws.com/arc-authors/washpost/8de6ff68-199a-4a59-a7b7-2ba00d3daab1.png" />}
              >
                <div style={{textAlign:'center'}}>
                  <span style={{fontSize:16,fontWeight:'500'}}>Name Surname</span>
                  <br/>
                  <span>Co- Jar man</span>
                </div>
            </Card>
            <Card
                hoverable
                bodyStyle={{backgroundColor:'#00d563',color:'#fff'}}

                cover={<img alt="example" src="http://webcom.colostate.edu/china/files/2016/05/Yu-Xiuyuan-Profile-photo.jpg" />}
              >
                <div style={{textAlign:'center'}}>
                  <span style={{fontSize:16,fontWeight:'500'}}>Name Surname</span>
                  <br/>
                  <span>Co- Jar man</span>
                </div>
            </Card>
            <Card
                hoverable
                bodyStyle={{backgroundColor:'#00d563',color:'#fff'}}

                cover={<img alt="example" src="http://www.xjtlu.edu.cn/en/assets/image-cache/158822536xec.c7c0fced.jpg" />}
              >
                <div style={{textAlign:'center'}}>
                  <span style={{fontSize:16,fontWeight:'500'}}>Name Surname</span>
                  <br/>
                  <span>Co- Jar man</span>
                </div>
            </Card>

            <Card
                hoverable
                bodyStyle={{backgroundColor:'#00d563',color:'#fff'}}

                cover={<img alt="example" src="https://s3-us-west-1.amazonaws.com/co-directory-images/jack-mckenna-30466432.jpg" />}
              >
                <div style={{textAlign:'center'}}>
                  <span style={{fontSize:16,fontWeight:'500'}}>Name Surname</span>
                  <br/>
                  <span>Co- Jar man</span>
                </div>
            </Card>

            
            <Card
                hoverable
                bodyStyle={{backgroundColor:'#00d563',color:'#fff'}}
                  cover={<img alt="example" src="http://wwwf.imperial.ac.uk/blog/student-blogs/files/2017/01/xu-profile-400-1-150x150.png" />}
              >
                <div style={{textAlign:'center'}}>
                  <span style={{fontSize:16,fontWeight:'500'}}>Name Surname</span>
                  <br/>
                  <span>Co- Jar man</span>
                </div>
            </Card>

        </Slider>
     
      </div>
      
      <div className="login__block" style={{backgroundColor:'#00d563'}}>
          <div className="row">
            <div className="col-xl-12">
              <div className="login__block__promo text-dark text-center">
                <h1 className="text-white">
                  <strong>CONTACT US!</strong>
                </h1>


                <h4 style={{float:'left',marginTop:50}} className="text-white">E-mail address</h4>
                <Input placeholder='E-mail address'></Input>

                <h4 style={{float:'left',marginTop:50}} className="text-white">How we can help you?</h4>
                <TextArea rows={4} />


                <Button style={{marginTop:70,borderRadius:20}}>SEND MESSAGE</Button>

                <Button shape={'circle'} style={{position:'absolute',right:'10%',bottom:5,backgroundColor:'#fff',color:'#2ace57', fontSize:30,width:70,height:70 }} onClick={this.showModal}>
                   <span className={'icmn icmn-bubbles'} style={{color:'#2ace57',fontSize:35}}/>
                 </Button>
                
            </div>
          </div>
        </div>
      </div>
      
      <Row style={{paddingLeft:'5%',paddingRight:'5%'}} >
      
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
                    <strong>product</strong>
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
                    <strong>product</strong>
                  </h3>
                  <br/>
                   <span className={'icmn icmn-facebook'} style={{color:'#323232',fontSize:35,marginLeft:5}}/>
                   <span className={'icmn icmn-twitter'} style={{color:'#323232',fontSize:35,marginLeft:20}}/>
                   <span className={'icmn icmn-linkedin2'} style={{color:'#323232',fontSize:35,marginLeft:20}}/>
                </div>
              </Col>
            </Row>
      </div>
    )
  }
}

export default Register
