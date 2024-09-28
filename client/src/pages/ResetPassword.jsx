import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function ResetPassword() {
    const [password, setPassword] = useState("");
    const { token } = useParams();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post(`https://riskend.onrender.com/auth/resetPassword/` + token, {
                password,
            })
            .then((res) => {
                if (res.data.status) {
                    navigate("/cms/login");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <>
            <section className="signup">
                <form>
                    <h1>Reset Password</h1>
                    <input
                        type="password"
                        placeholder="*******"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={handleSubmit}>Reset</button>
                </form>
                <Link to="/cms/login">Login</Link>
            </section>
        </>
    );
}

export default ResetPassword;
