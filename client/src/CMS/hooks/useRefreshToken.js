import { axiosPrivate } from "../../api/axios";
import { jwtDecode } from "jwt-decode";
import useAuth from "./useAuth";

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axiosPrivate.get(`/refresh/`);

        const accessToken = response.data.accessToken;
        const decoded = accessToken ? jwtDecode(accessToken) : undefined;
        const id = decoded?.id || "";
        const email = decoded?.email || "";

        setAuth((prev) => {
            return {
                ...prev,
                accessToken: accessToken,
                id: id,
                email: email,
            };
        });
        return response.data.accessToken;
    };
    return refresh;
};

export default useRefreshToken;
