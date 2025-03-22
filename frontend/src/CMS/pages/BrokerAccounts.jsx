import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

import BrokerModal from "../components/BrokerModal";

function BrokerAccounts() {
    const axiosPrivate = useAxiosPrivate();
    const [accounts, setAccounts] = useState([]);
    const [rowValues, setRowValues] = useState();

    const [openUpdateBroker, setOpenUpdateBroker] = useState(false);

    const getAccounts = async () => {
        try {
            const response = await axiosPrivate.get("/broker-acc/cms");

            setAccounts(response.data.brokerAccounts);
        } catch (error) {
            console.log(error);
        }
    };

    const handleEdit = (e) => {
        setRowValues({
            id: e.target.value,
            accNo: e.target.closest(".tr").childNodes[2].innerText,
            password: e.target.closest(".tr").childNodes[3].innerText,
            server: e.target.closest(".tr").childNodes[4].innerText,
            broker: e.target.closest(".tr").childNodes[5].innerText,
            status: e.target.closest(".tr").childNodes[6].value,
            id: e.target.closest(".tr").childNodes[8].value,
        });

        setOpenUpdateBroker(true);
    };

    useEffect(() => {
        getAccounts();
    }, []);

    return (
        <>
            {openUpdateBroker && (
                <BrokerModal
                    defaultValues={rowValues}
                    setOpenUpdateBroker={setOpenUpdateBroker}
                    getAccounts={getAccounts}
                />
            )}
            <section className="container">
                <div>
                    <h1>حسابات البروكر</h1>
                    <div className="broker-list">
                        <ul>
                            <li>
                                <span>الاسم</span>
                                <span>البريد الالكتروني</span>
                                <span>رقم الحساب</span>
                                <span>كلمة السر</span>
                                <span>السيرفر</span>
                                <span>البروكر</span>
                                <span>الحالة</span>
                                <span></span>
                            </li>
                            <div className="line"></div>
                            {accounts?.map((item, index) => (
                                <li className="tr" key={index}>
                                    <span>{item.cusId.name}</span>
                                    <span className="email ellipsis">{item.cusId.email}</span>
                                    <span>{item.accNo}</span>
                                    <span>{item.password}</span>
                                    <span>{item.server}</span>
                                    <span>{item.broker}</span>
                                    <span value={item?.status?._id}>
                                        {item?.status?.name || "تحت معالجة"}
                                    </span>
                                    <i onClick={(e) => handleEdit(e)} class="bi-pencil-square"></i>
                                    <input hidden value={item._id} />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>
        </>
    );
}

export default BrokerAccounts;
