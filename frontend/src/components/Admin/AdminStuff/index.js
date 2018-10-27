import React from 'react';
import { Avatar ,Button, Row, Col, Card, List, Collapse,Icon,Input,Divider,Modal } from 'antd';
import {customPanelStyle} from './const'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { addDentist } from '../../../actions/authentication';
import axios from 'axios';



const Panel = Collapse.Panel;
function callback(key) {
    console.log(key);
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
            errors: {}
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitO = this.handleSubmitO.bind(this);
        
    }

    state = {
        visible:false,
        visible_opertor:false,
      }

    componentDidMount(){
        axios.get('/api/users/')
        .then(res => {
            const data_dentists = res.data;
            this.setState({ data_dentists });
        });

        axios.get('/api/operators/')
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
        console.log(e);
        this.setState({
          hidden: !this.state.hidden,
        });
      }
    
      handleOk = (e) => {
        console.log(e);
        this.setState({
          visible: false,
          visible_opertor:false,
        });
      }
    
      handleCancel = (e) => {
        console.log(e);
        this.setState({
          visible: false,
          visible_opertor:false,

        });
      }

      handleSubmit(e) {
        e.preventDefault();
        
        let that = this;
        const InserData  = {

            'name': this.state.name,
            'lastname': this.state.lastname,
            'address': this.state.address,
            'phone': this.state.phone,
            'number': this.state.number,
            'email': this.state.email,
            'password': this.state.password,
            'password_confirm': this.state.password,

        }

        axios({
            method: 'post',
            url: `/api/users/register`,
            data: InserData,
            config: {headers: {'Content-Type': 'multipart/form-data'}}
        })
            .then(function (response) {

                if (response.status === 200) {
                    console.log("Insert Success");
                    console.log(response);
                }

                that.setState({data_dentists: [...that.state.data_dentists, InserData], visible: false}, () => {
                });

            })

            .catch(function (response) {
                console.log(response);
                return
            });

    }

    handleSubmitO(e) {
        e.preventDefault();
        
        let that = this;
        const InserDataO  = {

            'name': this.state.Oname,
            'email': this.state.Oemail,
            'password': this.state.Opassword,
            'password_confirm': this.state.Opassword,

        }

        console.log("==============+==================",InserDataO)

        axios({
            method: 'post',
            url: `/api/operators/register`,
            data: InserDataO,
            config: {headers: {'Content-Type': 'multipart/form-data'}}
        })
            .then(function (response) {

                if (response.status === 200) {
                    console.log("Insert Success");
                    console.log(response);
                }

                that.setState({data_operators: [...that.state.data_operators, InserDataO], visible_opertor: false,}, () => {
                });

            })

            .catch(function (response) {
                console.log(response);
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
                                                  <Avatar src={item.image} size="large"/>
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
                                                <Icon type="delete" theme="outlined" style={{color:'#666',float:'right'}} />
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
                            renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    title={
                                        <Collapse bordered={false} onChange={callback}>
                                            <Panel
                                              header={
                                                <div>
                                                  <Avatar src={item.image} size="large"/>
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
                                                <Icon type="delete" theme="outlined" style={{color:'#666',float:'right'}} />
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
                          <form onSubmit={ this.handleSubmit }>
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

                            <button type="submit" style={{width:'100%'}}>Register</button>
                          </form>
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
                          <form onSubmit={ this.handleSubmitO }>
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

                            <button type="submit" style={{width:'100%'}}>Register</button>
                          </form>
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