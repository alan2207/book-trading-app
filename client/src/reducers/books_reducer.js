import {GET_BOOKS, ADD_BOOK, MY_BOOKS, DELETE_BOOK} from '../actions/types';

export default function(state = [], action) {
    switch(action.type) {
        case GET_BOOKS:
            return [...action.payload];
        case ADD_BOOK:
            return state.concat([action.payload]);
        case MY_BOOKS:
            return state.filter((book) => book.owner === localStorage.getItem('username'));
        case DELETE_BOOK:
            return state.filter((book) => book._id !== action.payload);
    }
    return state;
}