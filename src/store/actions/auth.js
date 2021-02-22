// import jwtDecode from 'jwt-decode';

import { auth } from '../types'

export const login = (data => ({
    type: auth.LOGIN,
    user: data.user,
    token: data.token,
    // fqdn: data.fqdn
}));

export const startLogin = ({ decoded, token} = {}) => {
    return (async dispatch => {
        console.log(decoded)

        try {
          
    
        return dispatch(login({user: decoded, token}));
            
        } catch (error) {
            throw error;
        }
    })
}


export const startLogout = () => {
    
    return async (dispatch) => {
    try {
        // destroyCookie(null, 'user');

        // destroyCookie(null, 'jwt');

        return dispatch(login({token: '', user: ''}));
    } catch (error) {
        throw error;
    }
    }
   
}



