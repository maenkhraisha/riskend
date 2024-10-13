import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

function LinkAccounts() {
    const axiosPrivate = useAxiosPrivate();
    const [accounts, setAccounts] = useState([]);
    const [statuses, setStatuses] = useState([]);

    const getStatus = async () => {
        try {
            const response = await axiosPrivate.get("/status");
            setStatuses(response.data.status);
        } catch (error) {
            console.log(error);
        }
    };

    const getAccounts = async () => {
        try {
            const response = await axiosPrivate.get("/link-acc/cms");
            setAccounts(response.data.linkAccounts);
            console.log(response.data.linkAccounts);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChangeStatus = async (e) => {
        const id = e.target.getAttribute("data-accid");
        try {
            const response = await axiosPrivate.put("/link-acc", {
                data: {
                    id: id,
                    status: e.target.value,
                },
            });
            getAccounts();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getStatus();
        getAccounts();
    }, []);

    return (
        <>
            <section className="main">
                <div>
                    <h1>حسابات الربط</h1>
                    <div className="link-list">
                        <ul>
                            <li>
                                <span>الاسم</span>
                                <span>رقم الحساب</span>

                                <span>الاسم</span>
                                <span>رقم الحساب</span>

                                <span>المخاطره</span>
                                <span>الفترة</span>

                                <span>الحالة</span>
                                <span></span>
                            </li>
                            <div className="line"></div>
                            {accounts?.map((acc, index) => (
                                <li className="tr" key={index}>
                                    <span className=" ellipsis">{acc.brokerId?.cusId.name}</span>
                                    <span>{acc.brokerId?.accNo}</span>

                                    <span className=" ellipsis">{acc.masterId?.cusId.name}</span>
                                    <span>{acc.masterId?.accNo}</span>

                                    <span>{acc.risk}</span>
                                    <span>{acc.period}</span>
                                    <select
                                        name="status"
                                        data-accid={acc._id}
                                        onChange={handleChangeStatus}
                                        value={acc?.status?._id}
                                    >
                                        <option value="1">اختر الحاله</option>
                                        {statuses &&
                                            statuses.map((status, index) => (
                                                <option key={index} value={status?._id}>
                                                    {status?.name}
                                                </option>
                                            ))}
                                    </select>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>
        </>
    );
}

export default LinkAccounts;
