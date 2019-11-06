import * as types from '../helpers/helper';

const initialState = {
    history: [{
      squares: Array(400).fill(null)
    }],
    stepNumber: 0,
    xIsNext: true,
    isIncrease: true,
    user: null,
    isLogin: false,
    isPlayWithComputer: null,
    isPlayWithAnother: null,
    isTurn: true, 
    isWaiting: null,
    partnerID: null,
    partnerName: null,
    UserPlayedID: null,
    UserPlayedName: null,
    isPartnerDauHang: false
  };

const gameReducer = (state = initialState, action) =>{
    switch (action.type) {
      case types.CLICK_SQUARE:
        return {
          ...state,
          history: action.history,
          stepNumber: action.stepNumber,
          xIsNext: action.xIsNext
        };
      case types.SET_STEPS:
        return {
          ...state,
          stepNumber: action.stepNumber,
          xIsNext: action.xIsNext
        };
      case types.SET_ISINCREASE:
        return { ...state, isIncrease: action.isIncrease };
      case types.GET_CURRENT_USER:
        return { ...state, user: action.user, isLogin: true };
      case types.PLAY_WITH_COMPUTER:
        return { ...state, isPlayWithComputer: action.isPlayWithComputer };
      case types.PLAY_WITH_ANOTHER:
        return { ...state, isPlayWithAnother: action.isPlayWithAnother };
      case types.SET_TURN:
        return { ...state, isTurn: action.isTurn };
      case types.FIND_ANOTHER:
        return { ...state, isWaiting: action.isWaiting };
      case types.SET_PARTNER_ID:
        return { ...state, partnerID: action.partnerID, partnerName: action.partnerName };
      case types.SET_USER_PLAYEDID:
        return { ...state, UserPlayedID: action.UserPlayedID, UserPlayedName: action.UserPlayedName };
        case types.SET_PARTNER_DAUHANG:
          return { ...state, isPartnerDauHang: action.isPartnerDauHang };
      default:
        return state;
    }
}
export default gameReducer;