import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function AccountLinkList() {
    const axiosPrivate = useAxiosPrivate();

    const [linkAccounts, setlinkAccounts] = useState([]);

    const getLinkAccounts = async () => {
        try {
            const response = await axiosPrivate.get("link-acc");
            let accounts = response.data.linkAccounts;
            accounts = accounts.filter((acc) => acc.brokerId != null);
            setlinkAccounts(accounts);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getLinkAccounts();
    }, []);
    return (
        <>
            <ul className="table account-master">
                <li>
                    <span></span>
                    <span>الاسم</span>
                    <span>المنصه</span>
                    <span>رقم الحساب</span>
                    <span>البروكر</span>
                    <span>الخطة</span>
                    <span>مدة الإشتراك</span>
                    <span>باقي</span>
                    <span>الحالة</span>
                </li>
                {linkAccounts.map((acc, index) => (
                    <li key={index}>
                        <span>{index + 1}</span>
                        <span className="rounded-gray">{acc.brokerId?.cusId.name}</span>
                        <span className="rounded-gray">{acc.brokerId?.platform}</span>
                        <span className="rounded-gray">{acc.brokerId?.accNo}</span>
                        <span className="rounded-gray">{acc.brokerId?.broker}</span>
                        <span className="rounded-gray">{acc.risk?.name}</span>
                        <span className="rounded-gray">{acc.period?.name}</span>
                        <span className="rounded-gray">{acc.status?.name}</span>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default AccountLinkList;
