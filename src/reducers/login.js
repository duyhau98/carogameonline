import * as types from '../helpers/helper';

const stateLogin = {
    isFetching: true,
    didInvalidate: false,
    userAuth: null
  };

const loginReducer = (state = stateLogin, action) =>{
    switch (action.type) {
        case types.REQUEST_LOGIN:

            return {...state,
                isFetching: true,
                didInvalidate: false,
                
            };
        case types.RECEIVE_LOGIN:
            return {...state,
                isFetching: false,
                didInvalidate: false,
                userAuth: action.stateLogin
        }
        default: return state;
    }
}
export default loginReducer;