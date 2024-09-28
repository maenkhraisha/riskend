import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { jwtDecode } from "jwt-decode";

function LoginCms() {
    let persistLS = window.localStorage.getItem("persist") == "true" ? true : false;
    const navigate = useNavigate();
    const { setAuth } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setloading] = useState(false);
    const [error, seterror] = useState("");
    const [persist, setPersist] = useState(persistLS);

    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault();
        setloading(true);
        axios
            .post("http://localhost:3500/auth/login", {
                email,
                password,
            })
            .then((response) => {
                setloading(false);
                if (response.data.status) {
                    const accessToken = response.data.accessToken;

                    const decoded = accessToken ? jwtDecode(accessToken) : undefined;
                    const id = decoded?.id || "";
                    const email = decoded?.email || "";

                    setAuth({ accessToken: accessToken, id: id, email: email });
                    navigate("/cms");
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
        return (
            error && (
                <div className="error-message">
                    <span>{error}</span>
                </div>
            )
        );
    };

    const toggoleChecked = () => {
        setPersist((prev) => !prev);

        if (persist) {
            localStorage.setItem("persist", false);
        } else {
            localStorage.setItem("persist", true);
        }
    };
    return (
        <>
            {errorMessage()}
            {loadingMessage()}

            <section className="form">
                <div>
                    <h1>تسجيل الدخول</h1>
                    <h3>إهلا بك ! يرجى إدخال البريد الإلكتروني والرقم السري</h3>
                </div>
                <form>
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button className="btn-yellow" onClick={handleSubmit}>
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

export default LoginCms;
