import { auth } from '../types';

const authDefaultState = { user: {}, token: null };
const AuthReducer =  (state = authDefaultState, action) => {
  
  switch (action.type) {
    case auth.LOGIN:
     console.log('try me',action.data)
      return {  user: action.data.user, token: action.data.token };

    case auth.LOGOUT:
      return { user: {}, token: null, fqdn: '' };
    default:
      return state;
  }
};

export default AuthReducer;