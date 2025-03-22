import React from "react";
import NavClient from "./components/NavClient";
import Tab from "./general_compenents/Tab";
import PersonalInfo from "./components/PersonalInfo";
import LoginInfo from "./components/LoginInfo";

function Profile() {
    return (
        <>
            <NavClient />
            <Tab
                tabs={[
                    { name: "البيانات الشخصية", content: <PersonalInfo /> },
                    { name: "بيانات تسجيل الدخول", content: <LoginInfo /> },
                ]}
            />
        </>
    );
}

export default Profile;
