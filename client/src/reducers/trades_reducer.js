import {GET_TRADES, PROCESS_TRADE} from '../actions/types';


export default function(state = [], action) {
    switch(action.type) {
        case GET_TRADES: 
            return action.payload;
        case PROCESS_TRADE: 
            return state.filter((trade) => trade._id !== action.payload);
    }

    return state;
}