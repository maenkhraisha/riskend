import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/components/SignUp";
import Home from "./pages/Home";
import Login from "./pages/components/Login";
import LoginSignup from "./pages/LoginSignup";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import RequireAuth from "./RequireAuth";
import { AuthProvider } from "./context/AuthProvider";

import About from "./pages/About";
import ClientDashboard from "./pages/ClientDashboard";
import AccountClient from "./pages/AccountClient";
import AccountMaster from "./pages/AccountMaster";
import MasterConnect from "./pages/MasterConnect";
import PersistLogin from "./PersistLogin";

import "./assets/css/style.css";
import Profile from "./pages/Profile";

function App() {
    return (
        <>
            <BrowserRouter>
                <AuthProvider>
                    <Routes>
                        {/* this route protected by login */}
                        <Route element={<PersistLogin />}>
                            <Route element={<RequireAuth />}>
                                <Route path="/about" element={<About />} />

                                <Route path="/clientDashboard" element={<ClientDashboard />} />
                                <Route path="/accountMaster" element={<AccountMaster />} />
                                <Route path="/accountClient" element={<AccountClient />} />
                                <Route path="/masterConnect" element={<MasterConnect />} />
                                <Route path="/profile" element={<Profile />} />
                            </Route>
                        </Route>
                        <Route path="/" element={<Home />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/loginSignup" element={<LoginSignup />} />
                        <Route path="/forgetPassword" element={<ForgetPassword />} />
                        <Route path="/resetPassword/:token" element={<ResetPassword />} />
                    </Routes>
                </AuthProvider>
            </BrowserRouter>
        </>
    );
}

export default App;
