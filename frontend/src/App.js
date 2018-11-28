import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authentication';
import PasswordReset from "./components/PasswordReset"
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import BadRequest from './components/BadRequest';
import Admin from './components/Admin';
import axios from "axios"
import 'bootstrap/dist/css/bootstrap.min.css';
import Operator from './components/Operator';
import Dentist from './components/Dentist';
import {Button,Input} from "antd"
import {Wrapper} from "./components/PasswordReset"
if(localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/login'
  }
}

const LoadForm = (props)=>{
  return (
    <div>
      <Wrapper>
        <h4>
        ajouter un nouveau mot de passe
        </h4>
      </Wrapper>

      <Wrapper>
        <Input placeholder={'New Password'}/>
      </Wrapper>

      <Wrapper>
        <Input placeholder={'Confirm Password'}/>
      </Wrapper>

      <Wrapper>
        <Button type={'primary'} style={{width:'100%'}}>
            Submit
        </Button>
      </Wrapper>
    </div>
  )
}


const LoadError = (props) =>(
  <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100vh'}}>
      <h4>
        Désolé, le lien reste mot de passe est expiré s'il vous plaît essayez à nouveau
      </h4>
      <a href="#">
        réessayer
      </a>
  </div>

)

class LoadOrFail extends React.Component{
  constructor(props){
    super(props)
    this.state={isValid:null}
  }

  componentDidMount(){
   axios.post(`/api/members/verifyEmail/${this.props.token}`).then(
     ({data:{isValid}})=>{
       this.setState(
         state=>({...state,isValid})
       )
     }
   )
  }

  render(){
    console.log(this.state)
    return <LoadOrFail />
  }
}

class App extends Component {
  render() {
    return (
      <Provider store = { store }>
       <Router>
        <Switch>
            <Route exact path="/" component={ Home } />
            <Route path="/reset/password" exact render={
              (match)=>(
                  <PasswordReset {...match}/>
              )
            }/>
            <Route  path="/register" component={ Register } />
            <Route  path="/login" component={ Login } />
            <Route  path="/admin" component={ Admin } />
            <Route  path="/operator" component={ Operator } />
            <Route  path="/dentist" component={ Dentist } />
            <Route path="/reset/:token" render={
              ({match:{params:{token}}}) => (
                <LoadOrFail token={token} />
              )
            } />
            <Route exact component={BadRequest} />
          </Switch>
          </Router>
        </Provider>
    );
  }
}



export default App;


