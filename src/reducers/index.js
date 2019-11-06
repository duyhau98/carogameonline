import { combineReducers } from 'redux';
import games from './game';
import login from './login';

const myReducer = combineReducers ({
    games,
    login
});
export default myReducer;