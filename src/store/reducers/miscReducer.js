import firebase from "firebase/compat/app";
import "firebase/compat/auth";
const initState = {};
const miscReducer = (state = initState, action) => {
  switch (action.type) {
    case "SET_BOARD_NAME":
      return {
        ...state,
        boardname: action.board_name,
      };
    default:
      return state;
  }
};

export default miscReducer;
