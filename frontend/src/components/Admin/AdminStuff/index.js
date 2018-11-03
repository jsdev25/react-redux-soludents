import React from 'react';
import { Avatar ,Button, Row, Col, Card, List, Collapse,Icon,Input,Divider,Modal } from 'antd';
import { Link } from 'react-router-dom';
import {customPanelStyle} from './const'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { addDentist } from '../../../actions/authentication';
import axios from 'axios';

const Panel = Collapse.Panel;
function callback(key) {

}

class AdminStuff extends React.Component {

    constructor(){
        super();
        this.state = {
            name: '',Oname:'',
            lastname:'',
            address:'',
            number:'',
            phone:'',
            email: '',Oemail:'',
            password: '',Opassword:'',
            users_list:[],
            data_dentists:[],
            data_operators:[],
            selectKey:-1,
            errors: {}
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitO = this.handleSubmitO.bind(this);
        this.DeleteDentist = this.DeleteDentist.bind(this);
        this.DeleteOperator = this.DeleteOperator.bind(this);

    }

    state = {
        visible:false,
        visible_opertor:false,
      }

    componentDidMount(){
        axios.get('/api/members/dentist')
        .then(res => {
            const data_dentists = res.data;
            this.setState({ data_dentists });
        });

        axios.get('/api/members/operator')
        .then(res => {
            const data_operators = res.data;
            this.setState({ data_operators });
        });
    }

    handleInputChange(e){
        var nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

      showModalOperator = () => {
        this.setState({
          visible_opertor:true,
        });
      }

      showModalDentist = () => {
        this.setState({
          visible:true,
        });
      }
    
      handlePayment = (e) => {
        this.setState({
          hidden: !this.state.hidden,
        });
      }
    
      handleOk = (e) => {
        this.setState({
          visible: false,
          visible_opertor:false,
        });
      }
    
      handleCancel = (e) => {
        this.setState({
          visible: false,
          visible_opertor:false,

        });
      }

      handleSubmit() {        
        let that = this;
        const InserData  = {

            'name': this.state.name,
            'lastname': this.state.lastname,
            'address': this.state.address,
            'phone': this.state.phone,
            'number': this.state.number,
            'email': this.state.email,
            'password': this.state.password,
            'admin': 0,
            'subscription': {
                'offer1' : 1
            }
        }

        axios({
            method: 'post',
            url: `/api/members/register`,
            data: InserData,
            config: {headers: {'Content-Type': 'multipart/form-data'}}
        })
            .then(function (response) {

                if (response.status === 200) {

                }

                that.setState({data_dentists: [...that.state.data_dentists, InserData], visible: false}, () => {
                });

            })

            .catch(function (response) {
                return
            });

    }

    DeleteDentist(e, wholedata){
      let that = this;
      const index = wholedata.findIndex(item=>item._id === e._id); 

      axios({    
        method: 'delete',
        url: `/api/members/` + e._id
    })
        .then(function (response) {

            if (response.status === 200) {
            
            }

        })

        .catch(function (response) {
            return
        });
        
        var array = [...that.state.data_dentists];
        array.splice(index, 1);
        that.setState({data_dentists: array});
      
    }

    DeleteOperator(e, wholedata){
        let that = this;
        const index = wholedata.findIndex(item=>item._id === e._id); 
  
        axios({    
          method: 'delete',
          url: `/api/members/` + e._id
      })
          .then(function (response) {
  
              if (response.status === 200) {
              }
  
          })
  
          .catch(function (response) {
              return
          });
          
          var array = [...that.state.data_operators];
          array.splice(index, 1);
          that.setState({data_operators: array});
        
      }

    handleSubmitO() {
        
        let that = this;
        const InserDataO  = {

            'name': this.state.Oname,
            'email': this.state.Oemail,
            'password': this.state.Opassword,
            'admin': 1,
            'subscription': {
                'offer1': 0
            }
        }

        axios({
            method: 'post',
            url: `/api/members/register`,
            data: InserDataO,
            config: {headers: {'Content-Type': 'multipart/form-data'}}
        })
            .then(function (response) {

                if (response.status === 200) {
                }

                that.setState({data_operators: [...that.state.data_operators, InserDataO], visible_opertor: false,}, () => {
                });

            })

            .catch(function (response) {
                return
            });

    }

  render() {
    return(
         <div>
             <Row gutter={12} >
                    <Col xs={12}>
                        <Card>
                            Your Operators
                        <List
                            itemLayout="horizontal"
                            dataSource={this.state.data_operators}
                            renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    title={
                                        <Collapse bordered={false} onChange={callback}>
                                            <Panel
                                              header={
                                                <div>
                                                  <Avatar src={'https://www.logolynx.com/images/logolynx/80/806ea60a1cae8046972d737107c2c8df.png'} size="large"/>
                                                  <span style={{marginLeft:15}}>{item.name}</span>
                                                </div>
                                                
                                              }
                                              style={customPanelStyle}
                                              key="1">
                                                <span style={{marginLeft:50}}>Dental Work History</span>
                                                <Icon type="file-pdf" theme="outlined" style={{color:'#666',float:'right'}}/>
                                                <br/>
                                                <span style={{marginLeft:50}}>Edit Account</span>
                                                <Icon type="form" theme="outlined" style={{color:'#666',float:'right'}}/>
                                                <br/>
                                                <span style={{marginLeft:50}}>Delete Account</span>
                                                <Icon onClick={(e,data) => this.DeleteOperator(item,  this.state.data_operators)} type="delete" theme="outlined" style={{color:'#666',float:'right'}} />
                                            </Panel>
                                        </Collapse>
                                    }
                                />
                            </List.Item>
                            )}
                        />
                        <div style={{ textAlign:'center'}}>
                            <Button shape={'circle'} style={{backgroundColor:'#00a99d',color:'#fff',fontSize:30,width:50,height:50 }} onClick={this.showModalOperator}>
                              +
                            </Button>
                        </div>
                        </Card>
                    </Col>

                     <Col xs={12}>
                        <Card>
                            Your Dentists
                        <List
                            itemLayout="horizontal"
                            dataSource={this.state.data_dentists}
                            renderItem={(item) => (
                            <List.Item >
                                <List.Item.Meta
                                    title={
                                        <Collapse bordered={false} onChange={callback}>
                                            <Panel
                                              header={
                                                <div>
                                                  <Avatar src={'https://www.shareicon.net/data/2015/12/21/690827_office_512x512.png'} size="large"/>
                                                  <span style={{marginLeft:15}}>{item.name}</span>
                                                </div>
                                                
                                              }
                                              style={customPanelStyle}
                                              key={1}>
                                                <span style={{marginLeft:50}}>Manage Subscriptions </span>
                                                <Icon type="file-pdf" theme="outlined" style={{color:'#666',float:'right'}}/>
                                                <br/>
                                                <span style={{marginLeft:50}}>Edit Account</span>
                                                <Icon type="form" theme="outlined" style={{color:'#666',float:'right'}}/>
                                                <br/>
                                                <span style={{marginLeft:50}}>Delete Account</span>
                                                <Icon onClick={(e,data) => this.DeleteDentist(item,  this.state.data_dentists)} type="delete" theme="outlined" style={{color:'#666',float:'right'}} />
                                            </Panel>
                                        </Collapse>
                                    }
                                />
                            </List.Item>
                            )}
                        />
                        <div style={{ textAlign:'center'}}>
                            <Button shape={'circle'} style={{backgroundColor:'#00a99d',color:'#fff',fontSize:30,width:50,height:50 }} onClick={this.showModalDentist}>
                              +
                            </Button>
                        </div>
                        </Card>
                    </Col>
                    <Col xs={24}>
                        <br/><br/><br/>
                        <Link to="/">
                           <Button style={{marginLeft:10, backgroundColor:'#00a99d',color:'#fff',width:120, height:50}}>Back</Button>
                        </Link> 
                    </Col>                          
                </Row>

                <Modal
                    centered={true}
                    title={"Dentist Information"}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[]}
                    >
                    <div>
                        <Row gutter={48} style={{padding:0,margin:0}}>
                        
                            <Col span={12}>
                            <label style={{fontWeight:'800'}}>First Name</label>
                                <Input placeholder="Jammy" style={{border: 'none'}} name="name" value={this.state.name} onChange={ this.handleInputChange }/>
                            </Col>

                             <Col span={12}>
                            <label style={{fontWeight:'800'}}>Last Name</label>
                                <Input placeholder="Jammy" style={{border: 'none'}} name="lastname" value={this.state.lastname} onChange={ this.handleInputChange }/>
                            </Col>
                            <Divider style={{padding:0,marginTop:5,marginBottom:15}}/>

                            <Col span={24}>
                            <label style={{fontWeight:'800'}}>Password</label>
                                <Input placeholder="********" style={{border: 'none'}} name="password" value={this.state.password} onChange={ this.handleInputChange }/>
                            </Col>
                            <Divider style={{padding:0,marginTop:5,marginBottom:15}}/>

                            <Col span={12}>
                            <label style={{fontWeight:'800'}}>Phone</label>
                                <Input placeholder="+1 234 56789" style={{border: 'none'}} name="phone" value={this.state.phone} onChange={ this.handleInputChange }/>
                            </Col>

                            <Col span={12}>
                            <label style={{fontWeight:'800'}}>Email</label>
                                <Input placeholder="jammy_white@aol.com" style={{border: 'none'}} name="email" value={this.state.email} onChange={ this.handleInputChange }/>
                            </Col>
                            <Divider style={{padding:0,marginTop:5,marginBottom:15}}/>

                            <Col span={24}>
                            <label style={{fontWeight:'800'}}>Address</label>
                                <Input placeholder="10 Woodford St, California CA 9820" style={{border: 'none'}} name="address" value={this.state.address} onChange={ this.handleInputChange }/>
                            </Col>
                            <Divider style={{padding:0,marginTop:5,marginBottom:15}}/>

                            <Col span={12}>
                            <label style={{fontWeight:'800'}}>Adzli Number</label>
                                <Input placeholder="123456789" style={{border: 'none'}} value={this.state.number} name="number" onChange={ this.handleInputChange }/>
                            </Col>

                            <Col span={12}>
                                <label style={{fontWeight:'800'}}>Input</label>
                                <Input placeholder="abc def ghki" style={{border: 'none'}} onChange={ this.handleInputChange }/>
                            </Col>

                            <button onClick={this.handleSubmit.bind(this)} style={{width:'100%'}}>Register</button>
                         
                        </Row>
                    </div>
                    </Modal>

                    <Modal
                        centered={true}
                        title={"Operator Information"}
                        visible={this.state.visible_opertor}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        footer={[]}
                    >
                    <div>
                        <Row gutter={48} style={{padding:0,margin:0}}>
                            <Col span={12}>
                            <label style={{fontWeight:'800'}}>Name</label>
                                <Input placeholder="Jammy" style={{border: 'none'}} name="Oname" value={this.state.Oname} onChange={ this.handleInputChange }/>
                            </Col>

                            <Col span={12}>
                            <label style={{fontWeight:'800'}}>Password</label>
                                <Input placeholder="********" style={{border: 'none'}} name="Opassword" value={this.state.Opassword} onChange={ this.handleInputChange }/>
                            </Col>
                            <Divider style={{padding:0,marginTop:5,marginBottom:15}}/>

                            <Col span={12}>
                            <label style={{fontWeight:'800'}}>Email</label>
                                <Input placeholder="jammy_white@aol.com" style={{border: 'none'}} name="Oemail" value={this.state.Oemail} onChange={ this.handleInputChange }/>
                            </Col>
                            <Divider style={{padding:0,marginTop:5,marginBottom:15}}/> 

                            <button onClick={this.handleSubmitO.bind(this)}  style={{width:'100%'}}>Register</button>
                        </Row>
                    </div>
                    </Modal>
         </div>
    );
  }
}

AdminStuff.propTypes = {
    addDentist: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps,{ addDentist })(withRouter(AdminStuff))