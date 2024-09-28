import { Link } from "react-router-dom";

import edit from "../../assets/img/edit.png";
import trash from "../../assets/img/trash.png";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";

function AccountClientList() {
    // const clientAccounts = [
    //     {
    //         platform: "MT5",
    //         accountNo: "1343874",
    //         server: "VantageFx-Domo",
    //         broker: "Vantage",
    //         linkAccount: "ربط الحساب",
    //         status: "معالجة",
    //     },
    //     {
    //         platform: "MT5",
    //         accountNo: "1343874",
    //         server: "VantageFx-Domo",
    //         broker: "Vantage",
    //         linkAccount: "Jalal",
    //         status: "يعمل",
    //     },
    //     {
    //         platform: "MT5",
    //         accountNo: "1343874",
    //         server: "VantageFx-Domo",
    //         broker: "Vantage",
    //         linkAccount: "Jalal",
    //         status: "متوقف",
    //     },
    //     {
    //         platform: "MT5",
    //         accountNo: "1343874",
    //         server: "VantageFx-Domo",
    //         broker: "Vantage",
    //         linkAccount: "Jalal",
    //         status: "رفض",
    //     },
    //     {
    //         platform: "MT5",
    //         accountNo: "1343874",
    //         server: "VantageFx-Domo",
    //         broker: "Vantage",
    //         linkAccount: "Jalal",
    //         status: "ماستر",
    //     },
    // ];

    const [clientAccounts, setClientAccounts] = useState([]);
    const axiosPrivate = useAxiosPrivate();

    const getAccounts = async () => {
        try {
            const response = await axiosPrivate.get("/broker-acc");
            setClientAccounts(response.data.brokerAccounties);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAccounts();
    }, []);

    return (
        <>
            <ul className="accounts-list">
                <li>
                    <span></span>
                    <span>المنصة</span>
                    <span>رقم الحساب</span>
                    <span>الخادم</span>
                    <span>البروكر</span>
                    <span>حساب الناسخ</span>
                    <span>الحالة</span>
                </li>
                {clientAccounts.map((item, index) => (
                    <li key={index}>
                        <div>
                            <a>
                                <img src={edit} alt="" srcSet="" />
                            </a>
                            <a>
                                <img src={trash} alt="" srcSet="" />
                            </a>
                        </div>
                        <p className="rounded-gray">{item.platform}</p>
                        <p className="rounded-gray">{item.accNo}</p>
                        <p className="rounded-gray">{item.server}</p>
                        <p className="rounded-gray">{item.broker}</p>
                        <Link to="/masterConnect" className="rounded-gray">
                            {item.linkAccount || "ربط الحساب"}
                        </Link>
                        <p className="rounded-gray">{item.status || "تحت المراجعة"}</p>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default AccountClientList;
