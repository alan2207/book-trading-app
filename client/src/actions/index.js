import axios from 'axios';
import {AUTH_USER, UNAUTH_USER, GET_BOOKS, ADD_BOOK, MY_BOOKS, DELETE_BOOK, GET_TRADES, PROCESS_TRADE} from './types';

import  {ROOT_URL} from '../../config';


//=======================================
// USERS ACTIONS
//=======================================

// handling logging in
export function signinUser({email, password}, context) {
    return (dispatch) => {
        axios.post(`${ROOT_URL}/signin`, {email, password})
        .then(response => {
            dispatch({type: AUTH_USER});
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('username', response.data.username);
            localStorage.setItem('info', JSON.stringify(response.data.info));
            context.props.history.push('/');
            alertify.success('Welcome back!');
        })
        .catch(() => {
            alertify.error('Signing in failed!!!');
        })
    }
}


// handling signing up - creating a new user
export function signupUser({username, email, password}, context) {
    return (dispatch) => {
        axios.post(`${ROOT_URL}/signup`, {username, email, password})
        .then(response => {
            dispatch({type: AUTH_USER});
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('username', response.data.username);
            context.props.history.push('/');
            alertify.success('Welcome!');
        })
        .catch(response => {
            alertify.error(response.response.data.error);
        })
    }
}




// handling logging out
export function signoutUser() {
    return (dispatch) => {
        alertify.confirm('Are you sure you want to sign out?', function() {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            localStorage.removeItem('info');
            dispatch({type: UNAUTH_USER});
            alertify.success('You have successfully signed out!');
        }, function() {
            alertify.error('Signing out canceled!');
        })
        
    }
}

// changing password
export function changePassword({currentPassword, newPassword}) {
    return (dispatch) => {
        axios.post(`${ROOT_URL}/changepassword`, {currentPassword, newPassword}, {headers: {
            authorization: localStorage.getItem('token')
        }})
        .then((response) => {
            alertify.success(response.data.message);
        })
        .catch(err => alertify.error(err.response.data.error))
    }
}


// editing users info
export function editInfo(values) {
    return (dispatch) => {
        axios.post(`${ROOT_URL}/editinfo`, values, {headers: {
            authorization: localStorage.getItem('token')
        }})
        .then((response) => {
            localStorage.setItem('info', JSON.stringify(response.data.info));
            alertify.success('Updated!');
        })
    }
}


//////////////////////////////////////
// BOOKS ACTIONS
//////////////////////////////////////

// getting all books from the server
export function getBooks() {
    return (dispatch) => {
        axios.get(`${ROOT_URL}/getbooks`)
            .then((response) => {
                dispatch({type: GET_BOOKS, payload: response.data});
            })
    }
}


// handle adding a book by user
export function addBook(book) {
    return (dispatch) => {
        axios.post(`${ROOT_URL}/addbook`, {book}, {headers: {
            authorization: localStorage.getItem('token')
        }})
        .then((response) => {
            dispatch({type: ADD_BOOK, payload: response.data});
            alertify.success('Book Added!');
        })
    }
}

// handle deleting a book
export function deleteBook(id) {
    return (dispatch) => {
        alertify.confirm('Are you sure you want to delete this book?', function() {
            axios.delete(`${ROOT_URL}/deletebook/${id}`, {headers: {
            authorization: localStorage.getItem('token')
        }})
            .then((response) => {
                alertify.success(response.data);
                dispatch({type: DELETE_BOOK, payload: id})
            })
            .catch(() => alertify.error('Deleting Failed!'))
        })
    }
}

// getting books by the current user
export function myBooks() {
    return (dispatch) => {
        dispatch({type: MY_BOOKS});
    }
}


/////////////////////////////////////////////////////
// TRADES ACTIONS
/////////////////////////////////////////////////////

// initializing a trade by a user
export function initializeTrade(fromUser, fromBook, toUser, toBook) {
    return (dispatch) => {
        axios.post(`${ROOT_URL}/inittrade`, {fromUser, fromBook, toUser, toBook}, {headers: {
            authorization: localStorage.getItem('token')
        }})
            .then((response) => alertify.success(response.data))
            .catch((err) => alertify.error(err.response.data))
    }
}

// listing all the trades where the user is involved
export function getTrades() {
    return (dispatch) => {
        axios.get(`${ROOT_URL}/gettrades`, {headers: {
            authorization: localStorage.getItem('token')
        }})
            .then((response) => {
                dispatch({type: GET_TRADES, payload: response.data})
            })
    }
}

// canceling trade, can be triggered by the initiator or on rejection of the trade
export function cancelTrade(id) {
    return (dispatch) => {
        axios.delete(`${ROOT_URL}/canceltrade/${id}`, {headers: {
            authorization: localStorage.getItem('token')
        }})
        .then((response) => {
            alertify.success(response.data);

            dispatch({type: PROCESS_TRADE, payload: id});
        })
    }
}


// handling acceptance of the trade
export function acceptTrade(id) {
    return (dispatch) => {
        axios.put(`${ROOT_URL}/accepttrade/${id}`,{}, {headers: {
            authorization: localStorage.getItem('token')
        }})
            .then((response) => {
                alertify.success('Trade Completed!')
                dispatch({type: PROCESS_TRADE, payload: id});
            })
            .catch((err) => {
                alertify.error(err.response.data);
                dispatch({type: PROCESS_TRADE, payload: id});
            })
    }
}