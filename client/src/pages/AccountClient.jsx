import AccountClientList from "./components/AccountClientList";
import NavClient from "./components/NavClient";

import plus from "../assets/img/plus.png";
import { useState } from "react";
import AddBrokerAcc from "./components/AddBrokerAcc";
import UpgradeToMaster from "./components/UpgradeToMaster";

function AccountClient() {
    const [openUpgrad, setOpenUpgrad] = useState(false);
    const [openAddAccount, setOpenAddAccount] = useState(false);
    return (
        <>
            <NavClient />
            <div className="account-client">
                <div className="account-client__bar">
                    <a className="account-client__bar-upgrade" onClick={() => setOpenUpgrad(true)}>
                        الترقية الى حساب ماستر
                    </a>
                    <div>
                        <span>الحسابات</span>
                        <span>1-5</span>
                    </div>
                    <div className="account-client__bar-add">
                        <a onClick={() => setOpenAddAccount(true)}>إضافة حساب</a>
                        <img src={plus} alt="" srcSet="" />
                    </div>
                </div>
                <AccountClientList />
            </div>
            {openUpgrad && <UpgradeToMaster setOpenUpgrad={setOpenUpgrad} />}

            {openAddAccount && <AddBrokerAcc setOpenAddAccount={setOpenAddAccount} />}
        </>
    );
}

export default AccountClient;
