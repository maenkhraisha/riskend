import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";
import useAuth from "../hooks/useAuth";

const Layout = () => {
    const { auth } = useAuth();
    return (
        <main className="cms-container">
            <Nav />
            <Outlet />
        </main>
    );
};

export default Layout;
