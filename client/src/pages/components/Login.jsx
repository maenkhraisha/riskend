import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { jwtDecode } from "jwt-decode";

function Login() {
    let persistLS = window.localStorage.getItem("persist") == "true" ? true : false;
    const navigate = useNavigate();
    const { authCus, setAuthCus } = useAuth();
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");

    const [loading, setloading] = useState(false);
    const [error, seterror] = useState("");
    const [persist, setPersist] = useState(persistLS);

    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault();
        setloading(true);
        axios
            .post("http://localhost:3500/customer/login", {
                email,
                pwd,
            })
            .then((response) => {
                setloading(false);
                if (response.data.status) {
                    const accessToken = response.data.accessToken;

                    const decoded = accessToken ? jwtDecode(accessToken) : undefined;
                    const id = decoded?.id || "";
                    const email = decoded?.email || "";

                    setAuthCus({ accessToken: accessToken, id: id, email: email });
                    navigate("/accountClient");
                } else {
                    seterror(response.data.message);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const loadingMessage = () => {
        return (
            loading && (
                <div className="loading-message">
                    <p>Loading...</p>
                </div>
            )
        );
    };

    const errorMessage = () => {
        return error && <div className="error-message">{error}</div>;
    };

    const toggoleChecked = () => {
        setPersist((prev) => !prev);

        if (persist) {
            localStorage.setItem("cuspersist", false);
        } else {
            localStorage.setItem("cuspersist", true);
        }
    };
    return (
        <>
            {errorMessage()}
            {loadingMessage()}

            <section className="signup">
                <div>
                    <h1>تسجيل الدخول</h1>
                    <h3>إهلا بك ! يرجى إدخال البريد الإلكتروني والرقم السري</h3>
                </div>
                <form className="input-form">
                    <div className="input-group">
                        <label htmlFor="email">الايميل</label>
                        <input
                            type="text"
                            id="email"
                            autoComplete="false"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">كلمة المرور</label>
                        <input
                            type="password"
                            id="password"
                            autoComplete="false"
                            value={pwd}
                            onChange={(e) => setPwd(e.target.value)}
                        />
                    </div>
                    <button className="btn yellow wide" onClick={handleSubmit}>
                        الدخول
                    </button>
                    <div className="d-flex">
                        <input
                            type="checkbox"
                            name=""
                            id="persist"
                            onChange={() => toggoleChecked()}
                            checked={persist}
                        />
                        <label htmlFor="persist">تذكرني</label>
                    </div>
                    <Link to="/forgetPassword">نسيت كلمة المرور</Link>
                </form>
            </section>
        </>
    );
}

export default Login;
