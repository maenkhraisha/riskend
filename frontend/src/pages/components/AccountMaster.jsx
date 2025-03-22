import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function AccountMaster() {
    const axiosPrivate = useAxiosPrivate();

    const [accounts, setAccounts] = useState([]);

    const getAccounts = async () => {
        try {
            const response = await axiosPrivate.get("master-acc/my-account");
            let accounts = response.data.masters;
            console.log(accounts);

            setAccounts(accounts);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAccounts();
    }, []);

    return (
        <>
            <h1>حسابات الماستر</h1>
            <ul className="table master-list">
                <li>
                    <span>الاسم</span>
                    <span>المنصه</span>
                    <span>رقم الحساب</span>
                    <span>بروكر</span>
                    <span>الاشتراك الشهري</span>
                    <span>اقل راس مال</span>
                    <span>اقل ربح شهري</span>
                    <span>اشتراك العميل</span>
                </li>
                {accounts.map((acc, index) => (
                    <li key={index}>
                        <span className="rounded-gray">{acc?.cusId.name}</span>
                        <span className="rounded-gray">{acc?.platform}</span>
                        <span className="rounded-gray">{acc?.accNo}</span>
                        <span className="rounded-gray">{acc?.broker}</span>
                        <span className="rounded-gray">{acc?.masterId?.monthlySubscr}</span>
                        <span className="rounded-gray">{acc?.masterId?.minCapital}</span>
                        <span className="rounded-gray">{acc?.masterId?.minMonthlyProfit}</span>
                        <span className="rounded-gray">{acc?.masterId?.customerSubscr}</span>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default AccountMaster;
