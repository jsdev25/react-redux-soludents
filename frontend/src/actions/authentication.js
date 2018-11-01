import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import setAuthToken from '../setAuthToken';
import jwt_decode from 'jwt-decode';
const useradmin=JSON.parse(localStorage.getItem("UserAdmin"));

export const registerUser = (member, history) => dispatch => {
    axios.post('/api/members/register', member)
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

////////////////////////////////////////////////////////login admin
export const loginAdmin = (user, history) => dispatch => {
    axios.post('/api/members/login', user)
            .then(res => {
                const { token } = res.data;
                localStorage.setItem('jwtToken', token);
                localStorage.setItem('UserAdmin', JSON.stringify(res.data.member._id));
                localStorage.setItem('pwa', JSON.stringify(res.data.password));

                if( res.data.member.admin == 0) {
                    localStorage.setItem('admin', 0);
                    window.location.href = '/dentist'
                } else if (res.data.member.admin == 1){
                    localStorage.setItem('admin', 1);
                    window.location.href = '/operator'
                } else {
                    localStorage.setItem('admin', 2);
                    window.location.href = '/admin'
                }

                setAuthToken(token);
                const decoded = jwt_decode(token);
               
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

//////////////////////////////dentist//////////////////
export const UpdateDentist = (dentist, history) => dispatch => {
    console.log('-------11--------');
    axios.put('/api/members/update/'+useradmin._id, dentist)
            .then(res => {
                alert('Success Update Dentist')

                history.push('/dentist')        
                console.log('res',res.data)})
                
            .catch(err => {
                alert('Fail Update Dentist')
                console.log(err)
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
            });
}