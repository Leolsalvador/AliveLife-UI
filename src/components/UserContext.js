import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const storedUserRole = localStorage.getItem('userRole');
        if (storedUserRole) {
            setUserRole(storedUserRole);
        }
    }, []);

    const handleSetUserRole = (role) => {
        setUserRole(role);
        localStorage.setItem('userRole', role);
    };

    return (
        <UserContext.Provider value={{ userRole, setUserRole: handleSetUserRole }}>
            {children}
        </UserContext.Provider>
    );
};
