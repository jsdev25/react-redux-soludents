import React from 'react';
import { Avatar , Row, Col} from 'antd';
import { logoutUser } from '../../../actions/authentication';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
const useradmin=JSON.parse(localStorage.getItem("UserAdmin"));

class OperatorManage extends React.Component {

  constructor(){
    super();
    
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  state = {
    profile:false,
    subscription:false,
    manage:false,
  }


  handleSubmit() {
    
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
                You are Operator
            </div>
          </Col>
        </Row>

      </div>
    );
  }
}

OperatorManage.propTypes = {
  logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps,{ logoutUser })(withRouter(OperatorManage))