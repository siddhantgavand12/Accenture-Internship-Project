import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const[isAdmin, setIsAdmin] = useState(false);

    const login = (email, password) => {
        if (email === "admin@example.com" && password === "admin") {
            setIsAdmin(true);
            return true;
        }
        return false;
    };



    const logout = () => {
        setIsAdmin(false);
    };

    return (
        <AuthContext.Provider value={{ isAdmin, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}    

export const useAuth = () => {
    return useContext(AuthContext);
}

