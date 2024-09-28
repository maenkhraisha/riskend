import React from "react";
import Tab from "./general_compenents/Tab";
import Login from "./components/Login";
import Signup from "./components/SignUp";

function LoginSignup() {
    return (
        <div className="signup-register">
            <Tab
                tabs={[
                    { name: "تسجيل الدخول", content: <Login /> },
                    { name: "أنشئ حسابك الأن", content: <Signup /> },
                ]}
            />
        </div>
    );
}

export default LoginSignup;
