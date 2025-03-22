import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuthCus from "./hooks/useAuth";

const RequireAuth = () => {
    const { authCus } = useAuthCus();
    const location = useLocation();

    return authCus ? <Outlet /> : <Navigate to="/loginSignup" state={{ from: location }} replace />;
};

export default RequireAuth;
