import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function UpgradeToMaster({ setOpenUpgrad, accountsNum, getAccounts }) {
    const axiosPrivate = useAxiosPrivate();

    const [formData, setFormData] = useState({ accNo: accountsNum[0] });

    const handleFormData = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);

        try {
            const response = await axiosPrivate.post("/master-acc", {
                data: formData,
            });
            // setOpenUpgrad(false);
            getAccounts();
        } catch (error) {
            console.log(error);
        }
    };

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
                        <select name="accNo" onChange={handleFormData}>
                            {accountsNum &&
                                accountsNum.map((item, index) => (
                                    <option value={item}>{item}</option>
                                ))}
                        </select>
                    </div>
                    <div className="input-group">
                        <label htmlFor="">الاشتراك الشهري</label>
                        <input type="text" name="monthlySubscr" onChange={handleFormData} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="">أقل رأس مال للمتابعين</label>
                        <input type="text" name="minCapital" onChange={handleFormData} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="">أقل ربح شهري</label>
                        <input type="text" name="minMonthlyProfit" onChange={handleFormData} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="">إشتراك العميل</label>
                        <input type="text" name="customerSubscr" onChange={handleFormData} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="">TRC20 USDT</label>
                        <input type="text" name="usdt" onChange={handleFormData} />
                    </div>
                    <div className="input-group">
                        <div>
                            <input type="checkbox" name="" id="terms_and_condition" />
                            <label htmlFor="terms_and_condition">الشروط والاحكام</label>
                        </div>
                        <button onClick={handleSubmit} className="btn yellow">
                            ترقية
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default UpgradeToMaster;
