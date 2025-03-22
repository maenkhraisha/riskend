import { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";

function LoginInfo() {
    const { authCus } = useAuth();
    const axiosPrivate = useAxiosPrivate();

    const [message, setMessage] = useState();
    const [formData, setFormData] = useState();

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosPrivate.post("/customer/change-password", {
                id: authCus.id,
                pwd: formData.pwd,
                pwdConfrim: formData.pwdConfirm,
            });
            setMessage("Password Updated");
        } catch (error) {
            console.log(error);
        }
        setMessage("");
    };

    const handleFormData = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setFormData({ ...formData, [name]: value });
    };

    const notifyMessage = () => {
        return <div className="success-message">{message}</div>;
    };
    return (
        <>
            {message && notifyMessage()}
            <section className="main ">
                <form className="flex-form update-customer">
                    <div className="input-group">
                        <label htmlFor="name">الرقم السري</label>
                        <input type="password" name="pwd" onChange={handleFormData} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="name">تاكيد الرقم السري</label>
                        <input type="password" name="pwdConfirm" onChange={handleFormData} />
                    </div>
                    <button onClick={handleUpdate} className="btn yellow">
                        تعديل
                    </button>
                </form>
            </section>
        </>
    );
}

export default LoginInfo;
