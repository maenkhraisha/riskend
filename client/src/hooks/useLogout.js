import useAxiosPrivate from "./useAxiosPrivate";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
const useLogout = () => {
    const { setAuthCus } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const logout = async () => {
        try {
            const response = await axiosPrivate.get("/customer/logout");

            if (response.data.status) {
                setAuthCus({});
            }
            navigate("/loginSignup");
        } catch (err) {
            console.error(err);
        }
    };

    return logout;
};

export default useLogout;
