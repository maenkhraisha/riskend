import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";

const Layout = () => {
    return (
        <main className="cms-container">
            <Nav />
            <Outlet />
        </main>
    );
};

export default Layout;
