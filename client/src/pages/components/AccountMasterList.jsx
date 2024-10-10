import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function AccountMasterList() {
    const axiosPrivate = useAxiosPrivate();

    const [masters, setMasters] = useState([]);

    const getMasters = async () => {
        try {
            const response = await axiosPrivate.get("master-acc");
            setMasters(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getMasters();
    }, []);
    return (
        <>
            <ul className="table account-master">
                <span></span>
                <span>الاسم</span>
                <span>المنصه</span>
                <span>رقم الحساب</span>
                <span>البروكر</span>
                <span>الخطة</span>
                <span>مدة الإشتراك</span>
                <span>الحالة</span>
                {masters.lenght > 0
                    ? masters.map((item, index) => (
                          <>
                              <span>{item.number}</span>
                              <span className="rounded-gray">{item.name}</span>
                              <span className="rounded-gray">{item.platform}</span>
                              <span className="rounded-gray">{item.accountNo}</span>
                              <span className="rounded-gray">{item.broker}</span>
                              <span className="rounded-gray">{item.plan}</span>
                              <span className="rounded-gray">{item.subscription_period}</span>
                              <span className="rounded-gray">{item.status}</span>
                          </>
                      ))
                    : "no data"}
            </ul>
        </>
    );
}

export default AccountMasterList;
