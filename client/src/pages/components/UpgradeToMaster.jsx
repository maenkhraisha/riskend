import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function UpgradeToMaster({ setOpenUpgrad }) {
    const axiosPrivate = useAxiosPrivate();

    const [clientAccounts, setClientAccounts] = useState([]);

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
        <div className="popup account_ugrade">
            <form className="popup__content">
                <a className="popup__content-close" onClick={() => setOpenUpgrad(false)}>
                    &#x2715;
                </a>
                <div className="popup__content-inner">
                    <p className="popup__content-inner-title">طلب الانضمام إلى حساب ماستر</p>
                    <div className="input-group">
                        <label htmlFor="">اختر الحساب</label>
                        <select>
                            <option value="">account 1</option>
                            <option value="">account 2</option>
                            <option value="">account 3</option>
                            <option value="">account 4</option>
                            <option value="">account 5</option>
                        </select>
                    </div>
                    <div className="input-group">
                        <label htmlFor="">الاشتراك الشهري</label>
                        <input type="text" />
                    </div>
                    <div className="input-group">
                        <label htmlFor="">أقل رأس مال للمتابعين</label>
                        <input type="text" />
                    </div>
                    <div className="input-group">
                        <label htmlFor="">أقل ربح شهري</label>
                        <input type="text" />
                    </div>
                    <div className="input-group">
                        <label htmlFor="">إشتراك العميل</label>
                        <input type="text" />
                    </div>
                    <div className="input-group">
                        <label htmlFor="">TRC20 USDT</label>
                        <input type="text" />
                    </div>
                    <div className="input-group">
                        <div>
                            <input type="checkbox" name="" id="terms_and_condition" />
                            <label htmlFor="terms_and_condition">الشروط والاحكام</label>
                        </div>
                        <button className="btn yellow">ترقية</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default UpgradeToMaster;
