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
                    <h1>حسابات الماستر</h1>

                    <div className="table account-list">
                        <span>الاسم</span>
                        <span>البريد الالكتروني</span>
                        <span>رقم الهاتف</span>

                        <span>الدولة</span>
                        <div className="line"></div>
                        {accounts?.map((item, index) => (
                            <>
                                <span key={index}>{item.name}</span>
                                <span key={index}>{item.email}</span>
                                <span key={index}>{item.telephone}</span>

                                <span key={index}>{item.country.name}</span>
                            </>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}

export default MasterAccounts;
