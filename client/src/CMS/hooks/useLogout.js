import useAxiosPrivate from "./useAxiosPrivate";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
    const { setAuth } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const logout = async () => {
        try {
            const response = await axiosPrivate.get(`/auth/logout`);
            if (response.data.status) {
                setAuth({});
            }
            navigate("/cms/login");
        } catch (err) {
            console.error(err);
        }
    };

    return logout;
};

export default useLogout;
