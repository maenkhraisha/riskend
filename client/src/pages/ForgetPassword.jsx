import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgetPassword() {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post(`https://riskend.onrender.com/auth/forgetPassword`, {
                email,
            })
            .then((res) => {
                console.log(res.data);
                if (res.data.status) {
                    alert("please check your email to reset password");
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
                    <input
                        type="text"
                        placeholder="Please enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button onClick={handleSubmit}>Send</button>
                </form>
            </section>
        </>
    );
}

export default ForgetPassword;
