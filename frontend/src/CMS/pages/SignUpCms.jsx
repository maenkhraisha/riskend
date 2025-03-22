import { Link, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useState } from "react";

function SignUpCms() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosPrivate.post("/signup", {
                username,
                email,
                password,
            });

            console.log(response);

            navigate("/cms");
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <section className="form">
            <div>
                <h1>التسجيل</h1>
                <h3>إهلا بك ! يرجى إدخال البيانات الصحيحة</h3>
            </div>
            <form>
                <div className="input-group">
                    <label htmlFor="username">الاسم</label>
                    <input
                        type="text"
                        id="username"
                        autoComplete="false"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="email">البريد الإلكتروني</label>
                    <input
                        type="text"
                        id="email"
                        autoComplete="false"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="password">الرقم السري</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="*****"
                        autoComplete="false"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="confirm_password">تأكيد الرقم السري</label>
                    <input
                        type="password"
                        id="passwoconfirm_passwordrd"
                        placeholder="*****"
                        autoComplete="false"
                    />
                </div>
                <button onClick={handleSubmit}>تسجيل</button>
            </form>
        </section>
    );
}

export default SignUpCms;
