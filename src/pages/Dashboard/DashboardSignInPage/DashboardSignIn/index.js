import React from 'react'
import { Button, Collapse , Avatar, Col, Icon, Row, Divider, Modal, Checkbox, Input} from 'antd'
const Panel = Collapse.Panel;

const defaultPagination = {
  visible:true
}

class DashboardSignIn extends React.Component {

  state = {
    hidden:true
  }
  
  showModal = () => {
    this.setState({
      visible: true,
      hidden:true
    });
  }

  handlePayment = (e) => {
    console.log(e);
    this.setState({
      hidden: !this.state.hidden,
    });
  }

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  render() {

    return (
      <div>
        <div className="utils__title utils__title--flat mb-3">
          <strong style={{marginTop:30,marginLeft:25}}>Admin</strong>
          <Row gutter={48} style={{padding:0,margin:0,marginTop:30}}>

            <Col span={12}>
             <div className="card">
              <div className="card-header">
                <div className="utils__title">
                  <strong>Your Operators</strong>
                </div>
              </div>
              <div className="card-body">
              <Collapse bordered={false}>
                  <Panel 
                     header={
                       <div>
                         <Avatar src="http://www.chinawhisper.com/wp-content/uploads/2011/06/Shandong-College-of-Art-beautiful-girls.jpg" size="large"/>
                         <span style={{marginLeft:15}}>Operator 1</span>
                       </div>
                       
                    }
                     key="1">
                    <span style={{marginLeft:50}}>Dental Work History</span>
                    <span className={'icmn icmn-libreoffice'} style={{color:'#666',float:'right'}}/>
                    <br/><br/>
                    <span style={{marginLeft:50}}>Edit Account</span>
                    <span className={'icmn icmn-pencil'} style={{color:'#666',float:'right'}}/>
                    <br/><br/>
                    <span style={{marginLeft:50}}>Delete Account</span>
                    <span className={'icmn icmn-bin'} style={{color:'#666',float:'right'}}/>
                    <br/><br/>
                  </Panel>

                  <Panel header={
                       <div>
                         <Avatar src="http://www.chinawhisper.com/wp-content/uploads/2011/06/Shandong-College-of-Art-beautiful-girls.jpg" size="large"/>
                         <span style={{marginLeft:15}}>Operator 1</span>
                       </div>
                       
                    } key="2">
                    <span style={{marginLeft:50}}>Dental Work History</span>
                    <span className={'icmn icmn-libreoffice'} style={{color:'#666',float:'right'}}/>
                    <br/><br/>
                    <span style={{marginLeft:50}}>Edit Account</span>
                    <span className={'icmn icmn-pencil'} style={{color:'#666',float:'right'}}/>
                    <br/><br/>
                    <span style={{marginLeft:50}}>Delete Account</span>
                    <span className={'icmn icmn-bin'} style={{color:'#666',float:'right'}}/>
                    <br/><br/>
                  </Panel>

                  <Panel
                    header={
                      <div>
                        <Avatar src="http://www.chinawhisper.com/wp-content/uploads/2011/06/Shandong-College-of-Art-beautiful-girls.jpg" size="large"/>
                        <span style={{marginLeft:15}}>Operator 1</span>
                      </div>
                      
                  }
                  key="3">
                      <span style={{marginLeft:50}}>Dental Work History</span>
                    <span className={'icmn icmn-libreoffice'} style={{color:'#666',float:'right'}}/>
                    <br/><br/>
                    <span style={{marginLeft:50}}>Edit Account</span>
                    <span className={'icmn icmn-pencil'} style={{color:'#666',float:'right'}}/>
                    <br/><br/>
                    <span style={{marginLeft:50}}>Delete Account</span>
                    <span className={'icmn icmn-bin'} style={{color:'#666',float:'right'}}/>
                    <br/><br/>
                  </Panel>
              </Collapse>

              <center>
                <div style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center'}}>
                 <Button shape={'circle'} style={{backgroundColor:'#00a99d',color:'#fff',marginTop:40,fontSize:30,width:70,height:70 }} onClick={this.showModal}>
                   <Icon type="plus" style={{ display: 'inline-block', verticalAlign: 'middle',marginTop:-5 }} />
                 </Button>
                </div>
              </center>

             
              </div>
            </div>
            </Col>

             <Col span={12}>
             <div className="card">
              <div className="card-header">
                <div className="utils__title">
                  <strong>Your Dentists</strong>
                </div>
              </div>
              <div className="card-body">
              <Collapse bordered={false}>
                  <Panel 
                     header={
                       <div>
                         <Avatar src="http://www.chinawhisper.com/wp-content/uploads/2011/06/Shandong-College-of-Art-beautiful-girls.jpg" size="large"/>
                         <span style={{marginLeft:15}}>Operator 1</span>
                       </div>
                       
                    }
                     key="1">
                    <span style={{marginLeft:50}}>Dental Work History</span>
                    <span className={'icmn icmn-libreoffice'} style={{color:'#666',float:'right'}}/>
                    <br/><br/>
                    <span style={{marginLeft:50}}>Edit Account</span>
                    <span className={'icmn icmn-pencil'} style={{color:'#666',float:'right'}}/>
                    <br/><br/>
                    <span style={{marginLeft:50}}>Delete Account</span>
                    <span className={'icmn icmn-bin'} style={{color:'#666',float:'right'}}/>
                    <br/><br/>
                  </Panel>

                  <Panel header={
                       <div>
                         <Avatar src="http://www.chinawhisper.com/wp-content/uploads/2011/06/Shandong-College-of-Art-beautiful-girls.jpg" size="large"/>
                         <span style={{marginLeft:15}}>Operator 1</span>
                       </div>
                       
                    } key="2">
                    <span style={{marginLeft:50}}>Dental Work History</span>
                    <span className={'icmn icmn-libreoffice'} style={{color:'#666',float:'right'}}/>
                    <br/><br/>
                    <span style={{marginLeft:50}}>Edit Account</span>
                    <span className={'icmn icmn-pencil'} style={{color:'#666',float:'right'}}/>
                    <br/><br/>
                    <span style={{marginLeft:50}}>Delete Account</span>
                    <span className={'icmn icmn-bin'} style={{color:'#666',float:'right'}}/>
                    <br/><br/>
                  </Panel>

                  <Panel
                    header={
                      <div>
                        <Avatar src="http://www.chinawhisper.com/wp-content/uploads/2011/06/Shandong-College-of-Art-beautiful-girls.jpg" size="large"/>
                        <span style={{marginLeft:15}}>Operator 1</span>
                      </div>
                      
                  }
                  key="3">
                      <span style={{marginLeft:50}}>Dental Work History</span>
                    <span className={'icmn icmn-libreoffice'} style={{color:'#666',float:'right'}}/>
                    <br/><br/>
                    <span style={{marginLeft:50}}>Edit Account</span>
                    <span className={'icmn icmn-pencil'} style={{color:'#666',float:'right'}}/>
                    <br/><br/>
                    <span style={{marginLeft:50}}>Delete Account</span>
                    <span className={'icmn icmn-bin'} style={{color:'#666',float:'right'}}/>
                    <br/><br/>
                  </Panel>
              </Collapse>

              <center>
                <div style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center'}}>
                 <Button shape={'circle'} style={{backgroundColor:'#00a99d',color:'#fff',marginTop:40,fontSize:30,width:70,height:70 }} onClick={this.showModal}>
                   <Icon type="plus" style={{ display: 'inline-block', verticalAlign: 'middle',marginTop:-5 }} />
                 </Button>
                </div>
              </center>
              </div>
            </div>
            </Col>

            </Row>
        </div>
        <Modal
              centered={true}
              title={this.state.hidden ? "Personal Information" : "You have no subscription currently enabled"}
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              footer={[
                <center>
                  {this.state.hidden

                  ? <Button key="back" onClick={this.handlePayment} style={{backgroundColor:'#00a99d',color:'#fff',width:120}}>Save</Button>
                  :  <div>
                      <Button key="back" onClick={this.handleCancel} style={{backgroundColor:'#00a99d',color:'#fff',width:120}}>Pay</Button>
                      <Button key="back" onClick={this.handlePayment} style={{backgroundColor:'#00a99d',color:'#fff',width:120}}>Cancel</Button>
                    </div>  
                 
                  }
                </center>
              ]}
            >

            {this.state.hidden
            ? (
                <div>
                  <Row gutter={48} style={{padding:0,margin:0}}>

                    <Col span={24}>
                    <label style={{fontWeight:'800'}}>Full Name</label>
                        <Input placeholder="Jammy White" style={{border: 'none'}}/>
                    </Col>
                    <Divider style={{padding:0,marginTop:5,marginBottom:15}}/>

                    <Col span={24}>
                    <label style={{fontWeight:'800'}}>Password</label>
                        <Input placeholder="********" style={{border: 'none'}}/>
                    </Col>
                    <Divider style={{padding:0,marginTop:5,marginBottom:15}}/>

                    <Col span={12}>
                    <label style={{fontWeight:'800'}}>Phone</label>
                        <Input placeholder="+1 234 56789" style={{border: 'none'}}/>
                    </Col>

                    <Col span={12}>
                    <label style={{fontWeight:'800'}}>Email</label>
                        <Input placeholder="jammy_white@aol.com" style={{border: 'none'}}/>
                    </Col>
                    <Divider style={{padding:0,marginTop:5,marginBottom:15}}/>

                    <Col span={24}>
                    <label style={{fontWeight:'800'}}>Address</label>
                        <Input placeholder="10 Woodford St, California CA 9820" style={{border: 'none'}}/>
                    </Col>
                    <Divider style={{padding:0,marginTop:5,marginBottom:15}}/>

                    <Col span={12}>
                    <label style={{fontWeight:'800'}}>Adzli Number</label>
                        <Input placeholder="123456789" style={{border: 'none'}}/>
                    </Col>

                    <Col span={12}>
                        <label style={{fontWeight:'800'}}>Input</label>
                        <Input placeholder="abc def ghki" style={{border: 'none'}}/>
                    </Col>
                    </Row>
              </div>)
            : (<Collapse bordered={false}>
              <Panel header="Choose an offer" key="1">
                <span style={{marginLeft:20}}>Offer 1</span>
                <Checkbox style={{color:'#666',float:'right'}}></Checkbox>
                <br/>
                <span style={{marginLeft:20}}>Offer 2</span>
                <Checkbox style={{color:'#666',float:'right'}}></Checkbox>
                <br/>
                <span style={{marginLeft:20}}>Offer 3</span>
                <Checkbox style={{color:'#666',float:'right'}}></Checkbox>
                <br/>   
              </Panel>
          </Collapse>)
            }
            
            </Modal>
      </div>
    )
  }
}

export default DashboardSignIn
