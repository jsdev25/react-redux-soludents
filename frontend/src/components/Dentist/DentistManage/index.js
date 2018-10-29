import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar , Row, Col, Card, Button, Modal, Input, Divider, Collapse, Checkbox} from 'antd';
import { payAction, logoutUser } from '../../../actions/authentication';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Managefile from './Pdfupload'
import './index.css';
const Panel = Collapse.Panel;
const useradmin=JSON.parse(localStorage.getItem("UserAdmin"));

class DentistManage extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      offer1:false,
      offer2:false,
      offer3:false,
      offer4:false,
      offer5:false,
      offer6:false
    }
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  state = {
    profile:false,
    subscription:false,
    manage:false,
  }

  showProfile = () => {
    this.setState({
      profile: true,
    });
  }

  showSubscription = () => {
    this.setState({
      subscription: true,
    });
  }

  showManage = () => {
    this.setState({
      manage: true,
    });
  }

  handleOk = (e) => {
    console.log(e);
    this.setState({
      profile:false,
      subscription:false,
      manage:false,
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      profile:false,
      subscription:false,
      manage:false,
    });
  }

  handleChange1(){
    this.setState({
      offer1: ! this.state.offer1,
    });
  }

  handleChange2(){
    this.setState({
      offer2: !this.state.offer2,
      check1:1,
    });
  }

  handleChange3(){
    this.setState({
      offer3: !this.state.offer3,
    });
  }

  handleChange4(){
    this.setState({
      offer4: !this.state.offer4,
    });
  }

  handleChange5(){
    this.setState({
      offer5: !this.state.offer5,
    });
  }

  handleChange6(){
    this.setState({
      offer6: !this.state.offer6,
    });
  }

  handleSubmit() {
    //e.preventDefault();
    console.log("--",this.state.offer1);
    const subscription = {
        dentist_id: useradmin._id,
        offer1: this.state.offer1,
        offer2: this.state.offer2,
        offer3: this.state.offer3,
        offer4: this.state.offer4,
        offer5: this.state.offer5,
        offer6: this.state.offer6,
    }
    this.props.payAction(subscription, this.props.history);
  }

  onLogout(e) {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
    localStorage.setItem("admin",500)
  }
    
  render() {
    return(
      <div className="container-fluid" style={{backgroundColor:'#e7ebee',height:'100vh'}}>
        <Row>

          <Col xs={10} md={4} className="sidebar"  style={{position: 'fixed', height: '100vh'}}>

           <div>
                <div style={{textAlign:'center',marginTop:20}}>
                    <img src="https://seeklogo.com/images/F/free-delivery-logo-3F8F5B428D-seeklogo.com.png" style={{width:80,height:40}} />
                    <br/><br/>
                    <Avatar src="https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg" style={{width:110,height:110}} />
                    <br /><br/><br/>
                    <span className="text-muted" style={{color:'#fff'}}>{useradmin.name}</span>
                    <br />
                    <strong style={{color:'#fff'}}>{useradmin.email}</strong>

                </div>
                <a style={{position:'absolute',bottom:20,color:'#fff',left:'40%',cursor:'point'}} onClick={this.onLogout.bind(this)}>sign out</a>
           </div>
          
          </Col>

          <Col xs={10} md={4} className="sidebar" style={{position: 'relative'}}></Col>
          
          <Col xs={14} md={20}>
            <div className="card-view">
                <p>Dentist</p>
                <Card style={{backgroundColor:'#f5f6f8'}}>
                  Item Options
                </Card>
                <Card>
                  View Profile Section
                  <Button style={{float:"right", backgroundColor:'#00a99d',color:'#fff'}} onClick={this.showProfile}>Click Here</Button>
                </Card>      
                <Card>
                  View Subscription Section
                  <Button style={{float:"right", backgroundColor:'#00a99d',color:'#fff'}} onClick={this.showSubscription}>Click Here</Button>
                </Card>      
                <Card>
                  View Manage File Section
                  <Button style={{float:"right", backgroundColor:'#00a99d',color:'#fff'}} onClick={this.showManage}>Click Here</Button>
                </Card>              
            </div>
            <Link to="/">
              <Button style={{marginLeft:90, backgroundColor:'#00a99d',color:'#fff',width:120, height:50}}>Back</Button>
            </Link>
          </Col>

          
        </Row>

        <Modal
            centered={true}
            title={"Personal Information"}
            visible={this.state.profile}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            >
            <div>
                <Row gutter={48} style={{padding:0,margin:0}}>

                    <Col span={24}>
                    <label style={{fontWeight:'800'}}>Full Name</label>
                        <Input value={useradmin.name} style={{border: 'none'}}/>
                    </Col>
                    <Divider style={{padding:0,marginTop:5,marginBottom:15}}/>

                    <Col span={24}>
                    <label style={{fontWeight:'800'}}>Password</label>
                        <Input value={useradmin.real_password} style={{border: 'none'}}/>
                    </Col>
                    <Divider style={{padding:0,marginTop:5,marginBottom:15}}/>

                    <Col span={12}>
                    <label style={{fontWeight:'800'}}>Phone</label>
                        <Input value={useradmin.phone} style={{border: 'none'}}/>
                    </Col>

                    <Col span={12}>
                    <label style={{fontWeight:'800'}}>Email</label>
                        <Input value={useradmin.email} style={{border: 'none'}}/>
                    </Col>
                    <Divider style={{padding:0,marginTop:5,marginBottom:15}}/>

                    <Col span={24}>
                    <label style={{fontWeight:'800'}}>Address</label>
                        <Input value={useradmin.address} style={{border: 'none'}}/>
                    </Col>
                    <Divider style={{padding:0,marginTop:5,marginBottom:15}}/>

                    <Col span={12}>
                    <label style={{fontWeight:'800'}}>Adzli Number</label>
                        <Input value={useradmin.number} style={{border: 'none'}}/>
                    </Col>

                    <Col span={12}>
                        <label style={{fontWeight:'800'}}>Input</label>
                        <Input value="abc def ghki" style={{border: 'none'}}/>
                    </Col>
                    </Row>
                    </div>
        </Modal>

        <Modal
            centered={true}
            title={"Personal Information"}
            visible={this.state.subscription}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={[]}
            >
            <Collapse bordered={false}>
              <Panel header="Choose an offer" key="1">
                <form onSubmit={ this.handleSubmit }>
                    <span style={{marginLeft:20}}>Offer 1</span>
                    <Checkbox name="offer1"  onChange={this.handleChange1.bind(this)} value={this.state.offer1} style={{color:'#666',float:'right'}}></Checkbox>
                    <br/>
                    <span style={{marginLeft:20}}>Offer 2</span>
                    <Checkbox name="offer2" onChange={this.handleChange2.bind(this)} value={this.state.offer2} style={{color:'#666',float:'right'}}></Checkbox>
                    <br/>
                    <span style={{marginLeft:20}}>Offer 3</span>
                    <Checkbox name="offer3" onChange={this.handleChange3.bind(this)} value={this.state.offer3} style={{color:'#666',float:'right'}}></Checkbox>
                    <br/>  
                    <span style={{marginLeft:20}}>Offer 4</span>
                    <Checkbox name="offer4" onChange={this.handleChange4.bind(this)} value={this.state.offer4} style={{color:'#666',float:'right'}}></Checkbox>
                    <br/>
                    <span style={{marginLeft:20}}>Offer 5</span>
                    <Checkbox name="offer5" onChange={this.handleChange5.bind(this)} value={this.state.offer5} style={{color:'#666',float:'right'}}></Checkbox>
                    <br/>
                    <span style={{marginLeft:20}}>Offer 6</span>
                    <Checkbox name="offer6" onChange={this.handleChange6.bind(this)} value={this.state.offer6} style={{color:'#666',float:'right'}}></Checkbox>
                    <br/><br/>

                    <button style={{width:'100%'}} type="submit" className="btn btn-primary" >
                        Pay
                    </button>
                </form>
                <br/> 
              </Panel>
          </Collapse>
        </Modal>

        <Modal
            centered={true}
            title={"Upload Pdf"}
            visible={this.state.manage}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            width={820} 
            footer={[]}
            >
              <Managefile />
        </Modal>

        
        
      </div>
    );
  }
}

DentistManage.propTypes = {
  payAction: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,

};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps,{ payAction,logoutUser })(withRouter(DentistManage))