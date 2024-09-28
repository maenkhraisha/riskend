import { useContext, useDebugValue } from "react";
import AuthContext from "../context/AuthProvider";

const useAuth = () => {
    const { authCus } = useContext(AuthContext);

    useDebugValue(authCus, (authCus) => (authCus?.customer ? "Logged In" : "Logged Out"));
    return useContext(AuthContext);
};

export default useAuth;
