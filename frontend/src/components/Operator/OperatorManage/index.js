import React from 'react';
import { Avatar , Row, Col, Card, Table , Button, Modal, Collapse , Input} from 'antd';
import { logoutUser, AddRemarkDocument } from '../../../actions/authentication';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

const Panel = Collapse.Panel;
var newData;
var item,index
const useradmin=JSON.parse(localStorage.getItem("UserAdmin"));
const { TextArea } = Input;

class OperatorManage extends React.Component {

  constructor(){
    super();
    this.state = {
        data_document : [],
        data_operators : [],
        model_view: false,
        visible_editMange:false,
        status:'Un successful',
        operator_id:'',
        operator_name:'',
        remarks:'',
        store:'',
        admin_info:[],
        name:'',
        email:'',
        id:'',
        file_name: localStorage.getItem('files'),
        file_directory:localStorage.getItem('directory'),
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleChangeOperator=this.handleChangeOperator.bind(this);

    this.columns = [{
      title: 'File',
      dataIndex: 'Filename',
      key: 'Filename',
    }, {
      title: 'Dentist',
      dataIndex: 'dentist_name',
      key: 'dentist_name',
    }, {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    }, {
      title: 'Date',
      key: 'created_date',
      dataIndex: 'created_date',
    }, {
      title: 'Opeartor',
      key: 'operator_name',
      dataIndex: 'operator_name',
    }, {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button style={{backgroundColor:'#00a99d',color:'#fff'}} onClick={() => this.handleView(record)} >Click here</Button>
        </span>
      ),
    }];

  }

  state = {
    profile:false,
    subscription:false,
    manage:false,
  }

  handleClick(){
    const update_data = {
        operator_id:this.state.id,
        operator_name:this.state.name,
        content:this.state.remarks
  }



  const getDate = {dentist_name: item.dentist_name, status: this.state.status, _id:item._id, Filename: item.Filename, created_date: item.created_date, operator_name:item.operator_name}

    newData.splice(index, 1, {

      ...getDate,
      ...null,

    });

  this.setState({ data_document: newData,visible_editMange:false });
  this.props.AddRemarkDocument(update_data, item._id,this.props.history);

  }

  componentDidMount(){

    axios.get('/api/documents/operator/' + useradmin)
    .then(res => {
        const data_document = res.data;
        this.setState({ data_document });
    });

    axios.get('/api/members/' + useradmin)
    .then(res => {
        this.setState({ 
          name: res.data.data.name,
          email: res.data.data.email,
          id: res.data.data._id,
         });
    });

    axios.get('/api/members/operator')
    .then(res => {
      const data_operators = res.data;
      this.setState({ data_operators });
    });
  }

  handleView = (row) => {

    this.setState({
      visible_editMange:!this.state.visible_editMange
    })

    newData = [...this.state.data_document];
    index = newData.findIndex(item=>item._id === row._id);
    localStorage.setItem("directory", row.directory);
    localStorage.setItem("files", row.Filename);

    item = newData[index];
  }

  handleInputChange(e) {
    this.setState({
        [e.target.name]: e.target.value
    })
}

  onLogout(e) {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
    localStorage.setItem("admin",500)
  }

  handleOk = (e) => {
    this.setState({
      visible_editMange: false,
    });
  }

  handleCancel = (e) => {
    this.setState({
      visible_editMange:false,

    });
  }

  handleChange = (value) => {
    this.setState({
      status : value
    })
  }

  handleChangeOperator = (e,array) => {

    for(let i=0;i<array.length;i++){
      if(array[i]._id===e){
          this.setState({
            operator_id : array[i].name
          })
            }
          }
     }
    
  render() {
    return(
      <div className="container-fluid" style={{backgroundColor:'#e7ebee'}}>
        <Row>

          <Col xs={10} md={4} className="sidebar"  style={{position: 'fixed', height: '100vh'}}>

           <div>
                <div style={{textAlign:'center',marginTop:20}}>
                    <img src="https://seeklogo.com/images/F/free-delivery-logo-3F8F5B428D-seeklogo.com.png" alt="Smiley face" height="50" width="120"></img>
                    <br/><br/>
                    <Avatar src="https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg" style={{width:110,height:110}} />
                    <br /><br/><br/>
                    <span className="text-muted" style={{color:'#fff'}}>{this.state.name}</span>
                    <br />
                    <strong style={{color:'#fff'}}>{this.state.email}</strong>
                </div>
                <a style={{position:'absolute',bottom:20,color:'#fff',left:'40%',cursor:'point'}} onClick={this.onLogout.bind(this)}>sign out</a>
           </div>
          
          </Col>

          <Col xs={10} md={4} className="sidebar" style={{position: 'relative'}}></Col>
          
          <Col xs={14} md={20}>

            <div className="card-view" >
               <Card>
                  <Table columns={this.columns} dataSource={this.state.data_document} />
                </Card>
            </div>

          </Col>
        </Row>

        <Modal
            centered={true}
            title={"File Manage"}
            visible={this.state.visible_editMange}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={[]}
            >
                <a href={this.state.file_directory} download="proposed_file_name" type="file">FileName: {this.state.file_name}</a>              
                {/* <Collapse bordered={false}>
                  
                  <Panel header="Status In Progress: " key="1">
                       
                          <span style={{marginLeft:20}}>Edit: </span>
                          <Select
                            showSearch
                            style={{ width: 200 }}
                            placeholder="Select status"
                            optionFilterProp="children"
                            onChange={this.handleChange.bind(this)}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                          >
                            <Option value="In progress">In progress</Option>
                            <Option value="Un Successful">Un Successful</Option>
                            <Option value="Successful">Successful</Option>

                          </Select>              
                          <br/>
                      <br/> 
                  </Panel>
                </Collapse> */}

                <Collapse bordered={false}>
                    <Panel header="Remarks: " key="1">
                    <span style={{marginLeft:20}}>Edit: </span>
                    <br/>
                    <TextArea value={this.state.remarks} name="remarks" onChange={this.handleInputChange.bind(this)} rows={4}/>
                       
                    </Panel>
                </Collapse>

                  <button style={{width:'100%', marginTop:20}} onClick={this.handleClick.bind(this)} className="btn btn-primary" >
                    Save
                  </button>
        </Modal>

      </div>
    );
  }
}

OperatorManage.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  AddRemarkDocument: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps,{ logoutUser,AddRemarkDocument })(withRouter(OperatorManage))