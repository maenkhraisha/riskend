import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import trash from "../../assets/img/trash.png";

function MasterAccounts() {
    const [accounts, setAccounts] = useState([]);

    const axiosPrivate = useAxiosPrivate();

    const getAccounts = async () => {
        try {
            const response = await axiosPrivate.get("/customer");

            console.log(response.data);

            setAccounts(response.data.customers);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAccounts();
    }, []);

    return (
        <>
            <section className="main">
                <div>
                    <h1>العملاء</h1>

                    <div className="customer-list">
                        <ul>
                            <li>
                                <span>الاسم</span>
                                <span>البريد الالكتروني</span>
                                <span>رقم الهاتف</span>
                                <span>الدولة</span>
                                <span>تاريخ الميلاد</span>
                            </li>

                            <div className="line"></div>
                            {accounts?.map((item, index) => (
                                <li>
                                    <span key={index}>{item.name}</span>
                                    <span key={index}>{item.email}</span>
                                    <span key={index}>{item.telephone}</span>
                                    <span key={index}>{item.country.name}</span>
                                    <span key={index}>{item.birthDate}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>
        </>
    );
}

export default MasterAccounts;
