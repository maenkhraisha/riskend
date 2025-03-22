import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

function ForgetPassword() {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosPrivate.post(`/auth/forgetPassword`, {
                email,
            });

            console.log(response.data);
            if (response.data.status) {
                alert("please check your email to reset password");
                navigate("/cms/login");
            }
        } catch (err) {
            console.log(err);
        }
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
