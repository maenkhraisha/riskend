import axios from "axios";
import { jwtDecode } from "jwt-decode";
import useAuth from "./useAuth";

const useRefreshToken = () => {
    const { setAuthCus } = useAuth();

    const refresh = async () => {
        const response = await axios({
            method: "get",
            url: `https://riskend.onrender.com/cusRefresh/`,
            withCredentials: true,
        });

        const accessToken = response.data.accessToken;
        const decoded = accessToken ? jwtDecode(accessToken) : undefined;
        const id = decoded?.id || "";
        const email = decoded?.email || "";

        setAuthCus((prev) => {
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
