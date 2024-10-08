import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "./hooks/useRefreshToken";
import useAuth from "./hooks/useAuth";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { authCus } = useAuth();
    let persist = localStorage.getItem("cuspersist");

    persist = persist == "true" ? true : false;

    useEffect(() => {
        let isMounted = true;

        const verifyRefreshToken = async () => {
            try {
                const response = await refresh();
            } catch (err) {
                console.error(err);
            } finally {
                isMounted && setIsLoading(false);
            }
        };

        // persist added here AFTER tutorial video
        // Avoids unwanted call to verifyRefreshToken
        !authCus?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);

        return () => (isMounted = false);
    }, []);

    // useEffect(() => {
    //     console.log(`isLoading: ${isLoading}`);
    //     console.log(`aT: ${JSON.stringify(auth?.accessToken)}`);
    // }, [isLoading]);

    return <>{!persist ? <Outlet /> : isLoading ? <p>Loading...</p> : <Outlet />}</>;
};

export default PersistLogin;
