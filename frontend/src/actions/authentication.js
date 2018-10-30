import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import setAuthToken from '../setAuthToken';
import jwt_decode from 'jwt-decode';

export const registerUser = (user, history) => dispatch => {
    axios.post('/api/users/register', user)
            .then(res => {
                alert('Success Sign Up!!!')
                history.push('/login')
                console.log('res',res)})
                
            .catch(err => {
                
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
            });
}

export const addDentist = (user, history) => dispatch => {
    axios.post('/api/users/register', user)
            .then(res => {
                alert('Success Add Dentist')

                history.push('/admin')
                console.log('res',res)})
                
            .catch(err => {
                alert('Fail Add Dentist')
                console.log(err)
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
            });
}


export const loginAdmin = (user) => dispatch => {
    axios.post('/api/admins/login', user)
            .then(res => {
                const { token } = res.data;
                localStorage.setItem('jwtToken', token);
                localStorage.setItem('UserAdmin', JSON.stringify(res.data.admin));
                setAuthToken(token);
                const decoded = jwt_decode(token);
                dispatch(setCurrentUser(decoded));
            })
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
            });
}

export const payAction = (user, history) => dispatch => {
    axios.post('/api/subscriptions/subscription', user)
            .then(res =>{
              history.push('/login')
            })
            .catch(err => {
                alert('fail');
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
            });
}

export const addDocument = (document, history) => dispatch => {
    axios.post('/api/documents/document', document)
            .then(res =>{
             // history.push('/login')
            })
            .catch(err => {
                alert('fail');
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
            });
}

export const addOpeartor = (user, history) => dispatch => {
    axios.post('/api/users/register', user)
            .then(res => history.push('/login'))
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
            });
}

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

export const logoutUser = (history) => dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
    history.push('/');
}