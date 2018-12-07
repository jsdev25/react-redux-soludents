import axios from 'axios';
import { message } from 'antd';
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import setAuthToken from '../setAuthToken';
// import jwt_decode from 'jwt-decode';

export const registerUser = (member, history) => dispatch => {
    axios.post('/api/members/register', member)
        .then(res => {
            history.push('/login')
        })
        .catch(err => {

            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
}

export const addDentist = (user, history) => dispatch => {
    axios.post('/api/members/register', user)
        .then(res => {
            alert('Success Add Dentist')

            history.push('/admin')
        })

        .catch(err => {
            alert('Fail Add Dentist')
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
}

export const messageSend = (user, history) => dispatch => {
    axios.post('/api/emails/send', user)
        .then(res => {
            message.success('Success Message')
            // history.push('/admin')
        })

        .catch(err => {
            message.error('Username and Password not accepted. Please input correct information.')
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
}

export const loginAdmin = (user, history) => dispatch => {
    axios.post('/api/members/login', user)
        .then(res => {
            const { token } = res.data;
            localStorage.setItem('jwtToken', token);
            localStorage.setItem('UserAdmin', JSON.stringify(res.data.member._id));
            // localStorage.setItem('pwa', JSON.stringify(res.data.password));

            if (res.data.member.admin == 0) {
                localStorage.setItem('admin', 0);
                window.location.href = '/dentist'
            } else if (res.data.member.admin == 1) {
                localStorage.setItem('admin', 1);
                window.location.href = '/operator'
            } else {
                localStorage.setItem('admin', 2);
                window.location.href = '/admin'
            }

            setAuthToken(token);
            // const decoded = jwt_decode(token);

        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
}


export const addDocument = (document, history) => dispatch => {
    axios.post('/api/documents/document', document)
        .then(res => {
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
    axios.post('/api/members/register', user)
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
    window.location.href = '/login'
}

//////////////////////////////dentist//////////////////
export const UpdateDentist = (dentist, history) => dispatch => {
    axios.put('/api/members/update/dentist/' + JSON.parse(localStorage.getItem('UserAdmin')), dentist)
        .then(res => {
            console.log('my data', res)
            message.success('Success Update Dentist')
         //   history.push('/dentist')
        })

        .catch(err => {
            message.error('Fail Update Dentist')
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
}

// UpdateOpertorByAdmin

export const UpdateOpertorByAdmin = (data, history) => dispatch => {

    axios.put('/api/members/update/operator/' + localStorage.getItem('update_dentist'), data)
        .then(res => {
            
            console.log('my data', res)
            message.success('Success Update Operator')
           // history.push('/admin')
        })

        .catch(err => {
            message.error('Fail Update Operator')
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
}

export const UpdateDentistSubscription = (dentist, history) => dispatch => {

    axios.put('/api/members/update/subscription/' + JSON.parse(localStorage.getItem('UserAdmin')), dentist)
        .then(res => {
            message.success('Success Update Subscription')
            history.push('/dentist')
        })

        .catch(err => {
            message.error('Fail Update Dentist')
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
}

export const UpdateDentistSubscriptionByadmin = (dentist, history) => dispatch => {

    axios.put('/api/members/update/subscription/' + localStorage.getItem('update_dentist'), dentist)
        .then(res => {
            message.success('Success Update Subscription by admin')
            history.push('/admin')
        })

        .catch(err => {
            message.error('Fail Update Dentist')
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
}

export const UpdateDentistByAdmin = (dentist, history) => dispatch => {
    axios.put('/api/members/update/dentist/' + localStorage.getItem('update_dentist'), dentist)
        .then(res => {
            message.success('Success Update Dentist By Admin')
            //window.location.href = '/admin'
        })

        .catch(err => {
            message.error('Fail Update Dentist')
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
}

//////////////////////////////Update Document//////////////////
export const UpdateDocument = (data, id, history) => dispatch => {
    axios.put('/api/documents/update/' + id, data)
        .then(res => {
          //  message.success('Success Update Document')
        })
        // history.push('/dentist') })      

        .catch(err => {
            message.error('Fail Update Dentist')
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
}
///////////////////////Update Admin Password///////////////////
export const UpdateAdminPassword = (data, id, history) => dispatch => {
    axios.put('/api/members/update/user_password/' + id, data)
        .then(res => {
            message.success('Success Update Password')
        })
        // history.push('/dentist') })      

        .catch(err => {
            alert('Fail Update Password')
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
}
//////////////////////////////Pickup Document//////////////////
export const AddRemarkDocument = (data, id, history) => dispatch => {
    axios.post('/api/documents/insertremark/' + id, data)
        .then(res => {
             message.success('Success Update Document')
            // history.push('/dentist') 
        })

        .catch(err => {
            message.error('Fail Update Dentist')
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
}

export const AddHistory = (data, history) => dispatch => {
    axios.post('/api/histories/add/', data)
        .then(res => {
           // message.success('Success Add History')
            // history.push('/dentist') 
        })

        .catch(err => {
          //  message.error('Fail Add History')
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
}
