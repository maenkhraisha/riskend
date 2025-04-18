import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./CMS/context/AuthProvider";
import RequireAuthCms from "./CMS/RequireAuthCms";
import PersistLogin from "./CMS/PersistLoginCms";

import LoginCms from "./CMS/pages/LoginCms";
import SignUpCms from "./CMS/pages/SignUpCms";

import HomeCms from "./CMS/pages/HomeCms";
import Countries from "./CMS/pages/Countries";
import ForgetPassword from "./CMS/pages/ForgetPassword";
import UsersList from "./CMS/pages/UsersList";
import Conditions from "./CMS/pages/Conditions";
import Status from "./CMS/pages/Status";
import Risk from "./CMS/pages/Risk";
import Period from "./CMS/pages/Period";

import Layout from "./CMS/pages/Layout";

import "./assets/css/styleCms.css";
import CustomersAccounts from "./CMS/pages/CustomerAccounts";
import BrokerAccounts from "./CMS/pages/BrokerAccounts";
import LinkAccounts from "./CMS/pages/LinkAccounts";
import Home from "./pages/Home";

function AppCms() {
    return (
        <>
            <BrowserRouter>
                <AuthProvider>
                    <Routes>
                        <Route element={<PersistLogin />}>
                            <Route element={<RequireAuthCms />}>
                                <Route path="/cms" element={<Layout />}>
                                    <Route index element={<HomeCms />} />
                                    <Route path="/cms/countries" element={<Countries />} />
                                    <Route path="/cms/signup" element={<SignUpCms />} />
                                    <Route path="/cms/users" element={<UsersList />} />
                                    <Route path="/cms/status" element={<Status />} />
                                    <Route path="/cms/risk" element={<Risk />} />
                                    <Route path="/cms/period" element={<Period />} />
                                    <Route path="/cms/conditions" element={<Conditions />} />
                                    <Route
                                        path="/cms/customeraccounts"
                                        element={<CustomersAccounts />}
                                    />
                                    <Route
                                        path="/cms/brokeraccounts"
                                        element={<BrokerAccounts />}
                                    />
                                    <Route path="/cms/linkaccounts" element={<LinkAccounts />} />
                                </Route>
                            </Route>
                        </Route>
                        <Route path="/cms/forgetPassword" element={<ForgetPassword />} />
                        <Route path="/cms/login" element={<LoginCms />} />
                    </Routes>
                </AuthProvider>
            </BrowserRouter>
        </>
    );
}

export default AppCms;
