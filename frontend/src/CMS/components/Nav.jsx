import useLogout from "../hooks/useLogout";
import logo from "../../assets/img/logo.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import NavItems from "./NavItems";

const navList = [
    {
        title: "حسابات الزبائن",
        icon: "bi-person-square",
        children: [
            {
                title: "العملاء",
                path: "/cms/customeraccounts",
            },
            {
                title: "حسابات البروكر",
                path: "/cms/brokeraccounts",
            },
            {
                title: "طلبات الربط",
                path: "/cms/linkaccounts",
            },
            {
                title: "حسابات تم ربطها",
                path: "/cms/linkAccountsAccept",
            },
        ],
    },
    {
        title: "المستخدمين",
        icon: "bi-person-plus-fill",
        children: [
            {
                title: " اضافة مستخدم",
                path: "/cms/signup",
            },
            {
                title: "المستخدمين",
                path: "/cms/users",
            },
        ],
    },
    {
        title: "الصفحات",
        icon: "bi-file-earmark-fill",
        children: [
            {
                title: "الشروط و الاحكام",
                path: "/cms/conditions",
            },
        ],
    },
    {
        title: "الاعدادات",
        icon: "bi-gear-fill",
        children: [
            {
                title: "الدول",
                path: "/cms/countries",
            },
            {
                title: "الحالات",
                path: "/cms/status",
            },
            {
                title: "المخاطر",
                path: "/cms/risk",
            },
            {
                title: "مدة الاشتراك",
                path: "/cms/period",
            },
        ],
    },
];
function Nav() {
    const logout = useLogout();
    const [open, setOpen] = useState();

    return (
        <nav>
            <Link className="nav-logo" to={"/"}>
                <img src={logo} alt="" srcSet="" />
            </Link>
            <ul>
                {navList && navList.map((item, index) => <NavItems key={index} listItem={item} />)}
            </ul>
            <button className="btn-yellow" onClick={logout}>
                تسجيل الخروج
            </button>
        </nav>
    );
}

export default Nav;
