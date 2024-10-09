import React, { ReactNode, useState, useContext } from 'react';

interface AuthContextType {
    user: null | string; // Ajusta el tipo de 'user' según tus necesidades
    setUser: React.Dispatch<React.SetStateAction<null | string>>;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<null | string>(null); // Ajusta el estado inicial y el tipo de 'user' según tus necesidades

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};