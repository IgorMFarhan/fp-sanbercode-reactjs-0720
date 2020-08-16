import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = (props) => {
    const [auth, setAuth] = useState({
        currentUser: {
            id: 0,
            username: null,
            password: null,
        },
        list: null,
        status: false,
        url: 'https://backendexample.sanbersy.com/api/users',
        loginUrl: 'https://backendexample.sanbersy.com/api/login',
    });

    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {props.children}
        </AuthContext.Provider>
    )
}