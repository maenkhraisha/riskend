import useLogout from "../../hooks/useLogout";
import logo from "../../assets/img/logo.png";
import { Link } from "react-router-dom";
import DropDown from "../general_compenents/DropDown";

const list = [
    { key: 1, name: "لوحة التحكم", to: "/clientDashboard" },
    { key: 2, name: "إعدادات الحساب", to: "/profile" },
    { key: 3, name: "حساب الماستر", to: "" },
];
function NavClient() {
    const logout = useLogout();
    return (
        <nav className="nav client">
            <Link className="logo" to={"/"}>
                <img src={logo} alt="" srcSet="" />
            </Link>
            <ul>
                <Link to="/accountClient">حساب العميل</Link>
                <Link to="/accountMaster">حساب الماستر</Link>
                <Link to="/">السلة</Link>
            </ul>
            <DropDown text={"Ahmadatak"} id={"home_select"} content={list} />

            <button className="btn black" onClick={logout}>
                تسجيل خروج
            </button>
        </nav>
    );
}

export default NavClient;
