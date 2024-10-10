import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function AddBrokerAcc({ setOpenAddAccount, getAccounts }) {
    const axiosPrivate = useAxiosPrivate();

    const { authCus } = useAuth();

    const [formData, setFormData] = useState({
        cusId: authCus.id,
    });

    const handleFormData = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const AddAccount = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosPrivate.post("/broker-acc", formData);
            getAccounts();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="popup account_add">
            <form className="popup__content">
                <a className="popup__content-close" onClick={() => setOpenAddAccount(false)}>
                    &#x2715;
                </a>
                <div className="popup__content-inner">
                    <p className="popup__content-inner-title">اضف حساب</p>

                    <div className="input-group">
                        <label htmlFor="">المنصة</label>
                        <input
                            type="text"
                            name="platform"
                            value={formData?.platform}
                            onChange={handleFormData}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="">رقم الحساب</label>
                        <input
                            type="text"
                            name="accNo"
                            value={formData?.accNo}
                            onChange={handleFormData}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="">كلمة المرور</label>
                        <input
                            type="text"
                            name="password"
                            value={formData?.password}
                            onChange={handleFormData}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="">البروكر</label>
                        <input
                            type="text"
                            name="broker"
                            value={formData?.broker}
                            onChange={handleFormData}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="">الخادم</label>
                        <input
                            type="text"
                            name="server"
                            value={formData?.server}
                            onChange={handleFormData}
                        />
                    </div>
                    <div className="line"></div>
                    <div>
                        <button onClick={AddAccount} className="btn yellow">
                            اضف
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AddBrokerAcc;
