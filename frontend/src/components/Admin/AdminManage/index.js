import React from 'react';
import { Avatar , Row, Col, Card, Table , Button} from 'antd';
import { logoutUser } from '../../../actions/authentication';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import AdminStuff from '../AdminStuff'

const useradmin=JSON.parse(localStorage.getItem("UserAdmin"));

class AdminManage extends React.Component {

  constructor(){
    super();
    this.state = {
        data_document : [],
        model_view: false
    }
    
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
    return axios.get('http://localhost:5000/api/documents/')
    .then(res => {
        const data_document = res.data;
        this.setState({ data_document });
        console.log("documents", this.state.data_document)
    });
  }

  handleView = (row) => {

    const newData = [...this.state.data_document];
    const index = newData.findIndex(item=>item._id === row._id);

    const item = newData[index];
    console.log(item);
    console.log(row);

    const getDate = {dentist_id: "Eugene", status: "Successful", _id: "546ytrg534534r3454", Filename: "Rapunzel Story", created_date: "2018-09-03", operator_id:"0o03043i"}

    newData.splice(index, 1, {

      ...getDate,
      ...null,

      // ...item,
      // ...row,
    });

    this.setState({ data_document: newData });
    console.log('@@@@@@@@@@@@@@', this.state.data_document);
  }

  onLogout(e) {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
    localStorage.setItem("admin",500)
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