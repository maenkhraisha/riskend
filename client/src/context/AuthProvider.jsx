import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [authCus, setAuthCus] = useState();

    return <AuthContext.Provider value={{ authCus, setAuthCus }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
