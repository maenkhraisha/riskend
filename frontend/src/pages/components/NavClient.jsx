import useLogout from "../../hooks/useLogout";
import logo from "../../assets/img/logo.png";
import { Link } from "react-router-dom";
import DropDown from "../general_compenents/DropDown";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const list = [
    { key: 1, name: "لوحة التحكم", to: "/clientDashboard" },
    { key: 2, name: "إعدادات الحساب", to: "/profile" },
    { key: 3, name: "حساب الماستر", to: "" },
];
function NavClient() {
    const logout = useLogout();
    const { authCus } = useAuth();
    const axiosPrivate = useAxiosPrivate();

    const [userImage, setUserImage] = useState();
    const [userName, setUserName] = useState();

    const getCustomers = async () => {
        try {
            const response = await axiosPrivate.get(`/customer/${authCus.id}`);
            const customer = response.data.customer;
            setUserImage(customer.image);
            setUserName(customer.name);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getCustomers();
    }, []);

    return (
        <nav className="nav client">
            <Link className="logo" to={"/"}>
                <img src={logo} alt="" srcSet="" />
            </Link>
            <ul>
                <Link to="/accountClient">حساب العميل</Link>
                <Link to="/accountMaster">الماستر</Link>
                <Link to="/">السلة</Link>
            </ul>
            <DropDown userName={userName} userImage={userImage} id={"home_select"} content={list} />

            <button className="btn black" onClick={logout}>
                تسجيل خروج
            </button>
        </nav>
    );
}

export default NavClient;
