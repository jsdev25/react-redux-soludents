import React from 'react';
import { Avatar , Row, Col, Card, Table , Button, Modal, Collapse ,Select} from 'antd';
import { logoutUser } from '../../../actions/authentication';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import AdminStuff from '../AdminStuff'
const Panel = Collapse.Panel;
var newData;
var item,index
const useradmin=JSON.parse(localStorage.getItem("UserAdmin"));
const Option = Select.Option;



class AdminManage extends React.Component {

  constructor(){
    super();
    this.state = {
        data_document : [],
        data_operators : [],
        model_view: false,
        visible_editMange:false,
        status:'In progress',
        remarks:'Nothing',
        operator_id:'',
        file_name: localStorage.getItem('files'),
        file_directory:localStorage.getItem('directory'),
    }

    this.handleInputChange = this.handleInputChange.bind(this);


    this.columns = [{
      title: 'File',
      dataIndex: 'Filename',
      key: 'Filename',
    }, {
      title: 'Dentist',
      dataIndex: 'dentist_id',
      key: 'dentist_id',
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
      key: 'operator_id',
      dataIndex: 'operator_id',
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

  componentDidMount(){
    axios.get('/api/documents/')
    .then(res => {
        const data_document = res.data;
        this.setState({ data_document });
        console.log("documents", this.state.data_document)
    });

    axios.get('/api/operators/')
    .then(res => {
        const data_operators = res.data;
        this.setState({ data_operators });
        console.log("operators", this.state.data_operators)
    });
  }

  handleClick(){
    const update_data = {

      status: this.state.status,
      operator_id: this.state.operator_id,
      remarks: this.state.remarks,
  }

  const getDate = {dentist_id: item.dentist_id, status: this.state.status, _id:item._id, Filename: item.Filename, created_date: item.created_date, operator_id:this.state.operator_id}

    newData.splice(index, 1, {

      ...getDate,
      ...null,

    });

  this.setState({ data_document: newData,visible_editMange:false });

  console.log("update_data", update_data)

  }

  handleView = (row) => {

    this.setState({
      visible_editMange:!this.state.visible_editMange
    })

    newData = [...this.state.data_document];
    index = newData.findIndex(item=>item._id === row._id);
    localStorage.setItem("directory", row.directory);
    localStorage.setItem("files", row.Filename);
    console.log(row.directory,"++++++++++++++++++==")

    item = newData[index];
    console.log(item);
    console.log(row);

    
    console.log('@@@@@@@@@@@@@@', this.state.data_document);
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
    console.log(e);
    this.setState({
      visible_editMange: false,
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible_editMange:false,

    });
  }

  handleChange = (value) => {
    this.setState({
      status : value
    })
  }
    
  render() {
    return(
      <div className="container-fluid" style={{backgroundColor:'#e7ebee'}}>
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

            <div className="card-view" >
               <Card>
                  <Table columns={this.columns} dataSource={this.state.data_document} />
                </Card>
            </div>

            <div className="card-view" style={{marginTop:-150}} >
               <AdminStuff />
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
              
                <Collapse bordered={false}>
                  
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
                </Collapse>

                <Collapse bordered={false}>
                    <Panel header="Operator Name: " key="1">
                    <span style={{marginLeft:20}}>Edit: </span>
                    <Select
                            showSearch
                            style={{ width: 200 }}
                            placeholder="Select Opearator"
                            optionFilterProp="children"
                            onChange={this.handleChange.bind(this)}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                          >
                            {
                              this.state.data_operators.map(function(item, i){
                                return <Option key={i} value={item._id}>{item.name}</Option>;
                              })
                            }

                          </Select>  
                          <br/>
                        <br/> 
                    </Panel>
                </Collapse>

                {/* <Collapse bordered={false}>
                    <Panel header="Remarks: " key="1">
                            <span style={{marginLeft:20}}>Edit: </span>
                            <input name = "remarks" value={this.state.remarks} onChange={ this.handleInputChange }/>
                            <br/>
                        <br/> 
                    </Panel>
                </Collapse> */}
                
                  <button style={{width:'100%', marginTop:20}} onClick={this.handleClick.bind(this)} className="btn btn-primary" >
                    Save
                  </button>
        </Modal>

      </div>
    );
  }
}

AdminManage.propTypes = {
  logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps,{ logoutUser })(withRouter(AdminManage))