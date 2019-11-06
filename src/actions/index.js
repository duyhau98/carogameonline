import fetch from 'cross-fetch';
import * as types from '../helpers/helper';

export const squares = (history, stepNumber, xIsNext) => ({
  type: types.CLICK_SQUARE,
  history,
  stepNumber,
  xIsNext
});

export const steps = (stepNumber, xIsNext) => ({
  type: types.SET_STEPS,
  stepNumber,
  xIsNext
});

export const increase = isIncrease => ({
  type: types.SET_ISINCREASE,
  isIncrease
});

export function playWithComputer(isPlayWithComputer) {
  return {
    type: types.PLAY_WITH_COMPUTER,
    isPlayWithComputer
  };
}

export function FindAnother(isWaiting) {

  return {
    type: types.FIND_ANOTHER,
    isWaiting
  };
}

export function SetTurn(isTurn) {
  return {
    type: types.SET_TURN,
    isTurn
  };
}

export function playWithAnother(isPlayWithAnother) {
  return {
    type: types.PLAY_WITH_ANOTHER,
    isPlayWithAnother
  };
}

export function setPartnerID(partnerID,partnerName) {
  return {
    type: types.SET_PARTNER_ID,
    partnerID,
    partnerName
  };
}

export function setUserPlayedID(UserPlayedID, UserPlayedName) {
  return {
    type: types.SET_USER_PLAYEDID,
    UserPlayedID,
    UserPlayedName
  };
}

export function setPartnerDauHang(isPartnerDauHang) {
  return {
    type: types.SET_PARTNER_DAUHANG,
    isPartnerDauHang
  };
}
//

function requestLogin() {
  return {
    type: types.REQUEST_LOGIN
  };
}

function receiveLogin(stateLogin) {
  return {
    type: types.RECEIVE_LOGIN,
    stateLogin
  };
}

function getCurrentUser(user) {
  return {
    type: types.GET_CURRENT_USER,
    user
  };
}

export function fetchPostsLogin(usernameLogin, passwordLogin) {
  return function(dispatch) {
    dispatch(requestLogin());

    return fetch(`https://jwtduyhau.herokuapp.com/user/login`, {
      method: 'POST',
      body: JSON.stringify({
        username: usernameLogin,
        password: passwordLogin
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then(
        response => response.json(),

        error => console.log('An error occurred.', error)
      )
      .then(json => {
        if (json != null) {
          if (json.user != null) {
            localStorage.setItem('authToken', json.token);
            dispatch(getCurrentUser(json));
          }
          dispatch(receiveLogin(json));
        }
      });
  };
}

export function fetchCurrentUser() {
  if (localStorage.getItem('authToken') != null) {
    return function(dispatch) {
      return fetch(`https://jwtduyhau.herokuapp.com/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      })
        .then(response => response.json())
        .then(json => {
          console.log(localStorage.getItem('authToken'));
          dispatch(getCurrentUser(json));
        })
        .catch(err => {
          console.log(err);
        });
    };
  }
  return function(dispatch) {
    dispatch(getCurrentUser(null));
  };
}

export function logOut() {
  localStorage.removeItem('authToken');
  return function(dispatch) {
    dispatch(getCurrentUser(null));
  };
}
