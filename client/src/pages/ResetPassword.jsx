import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

function ResetPassword() {
    const axiosPrivate = useAxiosPrivate();
    const [password, setPassword] = useState("");
    const { token } = useParams();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
        } catch (error) {
            console.log(error);
        }
        const response = await axiosPrivate.post(`/auth/resetPassword/` + token, {
            password,
        });

        if (response.data.status) {
            navigate("/cms/login");
        }
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
