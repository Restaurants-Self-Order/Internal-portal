import axios from 'axios';
// import jwtDecode from 'jwt-decode';

import { auth } from '../types'

export const login = (data => ({
    type: auth.LOGIN,
    user: data.user,
    token: data.token,
    // fqdn: data.fqdn
}));

export const startLogin = ({ email = '', password = ''} = {}) => {
    return (async dispatch => {
        // perform all necessary call to the server
        const data = { email, password };

        try {
            // console.log({ url: process.env.API_URL })
            const res = await axios.post(`${process.env.REACT_APP_API_URL}auth/login`, data);
            if (res.data) {
            //    const payload =  jwtDecode(res.data.access_token);
            //    console.log(payload)
            //    console.log(res.data)
            // console.log('res', res.data);
                //   Coookies store
                // setCookie(null, 'jwt', res.data.data.token, {
                //     maxAge: 1 * 24 * 60 * 60,
                //     path: '/',
                // });

                // setCookie(null, 'user', JSON.stringify(res.data.data), {
                //     maxAge: 1 * 24 * 60 * 60,
                //     path: '/',
                // });
                // //   dispatch to store
                // if (res.data.code != 200) throw { response: { status: res.data.code, message: res.data.data.message} };
                //  const payload  = {
                //      token : res.data.data.token,
                //      user: res.data.data
                //  }   
                // return dispatch(login(payload));
            }
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



