import io from "socket.io-client";

export const socket = io('https://jwtduyhau.herokuapp.com');

export const CLICK_SQUARE = 'CLICK_SQUARE';

export const SET_STEPS = 'SET_STEPS';

export const SET_ISINCREASE = 'SET_ISINCREASE';

export const FETCH_LOGIN_REQUEST = 'FETCH_LOGIN_REQUEST';

export const FETCH_LOGIN_FAILURE = 'FETCH_LOGIN_FAILURE';

export const FETCH_LOGIN_SUCCESS = 'FETCH_LOGIN_SUCCESS';

export const REQUEST_LOGIN = 'REQUEST_LOGIN';

export const RECEIVE_LOGIN = 'RECEIVE_LOGIN';

export const GET_CURRENT_USER = 'GET_CURRENT_USER';

export const PLAY_WITH_COMPUTER = 'PLAY_WITH_COMPUTER';

export const PLAY_WITH_ANOTHER = 'PLAY_WITH_ANOTHER';

export const FIND_ANOTHER = 'FIND_ANOTHER';

export const SET_TURN = 'SET_TURN';

export const WAITING = 'WAITING';

export const SET_PARTNER_ID = 'SET_PARTNER_ID';

export const SET_USER_PLAYEDID = 'SET_USER_PLAYEDID';

export const SET_PARTNER_DAUHANG = 'SET_PARTNER_DAUHANG';

