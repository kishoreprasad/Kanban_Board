import firebase from "firebase/compat/app";
import "firebase/compat/auth";
const initState = {};
const miscReducer = (state = initState, action) => {
  return {
    ...state,
    boardname: action.boardname,
  };
};

export default miscReducer;
