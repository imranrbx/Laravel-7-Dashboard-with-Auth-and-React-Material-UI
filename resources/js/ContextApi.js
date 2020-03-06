import React from 'react';
const Auth = {
    isAuthenticated: localStorage.getItem("loggedIn")
        ? localStorage.getItem("loggedIn")
        : false,
    authenticate(cb) {
        localStorage.setItem('loggedIn', true)
        Auth.isAuthenticated = true

    },
    logout(cb){
        localStorage.removeItem('loggedIn')
        Auth.isAuthenticated = false;
    }
};
export default Auth;