import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../actions/authentication';
import classnames from 'classnames';
import Navbar from './Navbar';
import { Checkbox } from 'antd';
import { Link } from 'react-router-dom';

class LoginDentist extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            admin:'0',
            errors: {}
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password,
            admin:this.state.admin
        }
        this.props.loginUser(user);
    }

    componentDidMount() {
        if(this.props.auth.isAuthenticated) {
            this.props.history.push('/dentist');
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.auth.isAuthenticated) {

            localStorage.setItem("admin",this.state.admin);
            this.props.history.push('/dentist ')
            window.location.href='/dentist'
        }
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    render() {
        const {errors} = this.state;
        return(
            <div>
             <Navbar/>
             <div className="container" style={{ marginTop: 150, width: '700px'}}>
            <h2 style={{marginBottom: '40px'}}>Login with Dentist</h2>
            <form onSubmit={ this.handleSubmit }>
                <div className="form-group">
                    <input
                    type="email"
                    placeholder="Email"
                    className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.email
                    })}
                    name="email"
                    onChange={ this.handleInputChange }
                    value={ this.state.email }
                    />
                    {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                </div>
                <div className="form-group">
                    <input
                    type="password"
                    placeholder="Password"
                    className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.password
                    })} 
                    name="password"
                    onChange={ this.handleInputChange }
                    value={ this.state.password }
                    />
                    {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                </div>

                <Checkbox>Keep me signed in </Checkbox>

                <div className="form-group" style={{marginTop:10,marginBottom:40}}>
                    <button type="submit" className="btn btn-success" style={{width:'100%',backgroundColor:'#00d563'}}>
                        <strong style={{fontSize:23}}>LOGIN USER</strong>
                    </button>
                </div>

                <p>If you don't already have an account click the button below to create your account.</p>

                <div className="form-group" style={{marginTop:10}}>
                   <Link to="/register">
                        <button className="btn btn-success" style={{width:'100%',backgroundColor:'#00d563'}}>
                            <strong style={{fontSize:23}}>CREATE ACCOUNT</strong>
                        </button>
                   </Link>
                </div>
            </form>
        </div>
            </div>
        )
    }
}

LoginDentist.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

export  default connect(mapStateToProps, { loginUser })(LoginDentist)