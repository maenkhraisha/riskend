import NavClient from "./components/NavClient";
import { Link } from "react-router-dom";

import edit from "../assets/img/edit.png";
import trash from "../assets/img/trash.png";

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import plus from "../assets/img/plus.png";
import { useState, useEffect } from "react";
import AddBrokerAcc from "./components/AddBrokerAcc";
import UpgradeToMaster from "./components/UpgradeToMaster";
import useAuth from "../hooks/useAuth";

let accountsNum = [];

function AccountClient() {
    const [openUpgrad, setOpenUpgrad] = useState(false);
    const [openAddAccount, setOpenAddAccount] = useState(false);

    const { authCus } = useAuth();

    const [clientAccounts, setClientAccounts] = useState([]);
    const axiosPrivate = useAxiosPrivate();

    const getAccounts = async () => {
        try {
            const response = await axiosPrivate.get(`/broker-acc/${authCus.id}`);
            setClientAccounts(response.data.brokerAccounts);
            accountsNum = [];
            response.data.brokerAccounts.map((acc) => {
                if (acc.masterId == null) accountsNum.push(acc.accNo);
            });
        } catch (error) {
            console.log(error);
        }
    };
    const UpdateAccount = async (e) => {};
    const DeleteAccount = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosPrivate.delete("/broker-acc", {
                data: {
                    id: e.target.value,
                },
            });

            getAccounts();
        } catch (error) {
            console.log(error);
        }
    };

    const deleteMaster = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosPrivate.delete(`/master-acc/`, {
                data: {
                    accNo: e.target.value,
                },
            });
            getAccounts();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAccounts();
    }, []);
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
                <ul className="accounts-list">
                    <li>
                        <span></span>
                        <span>المنصة</span>
                        <span>رقم الحساب</span>
                        <span>الخادم</span>
                        <span>البروكر</span>
                        <span>حساب الناسخ</span>
                        <span>الحالة</span>
                    </li>
                    {clientAccounts.map((acc, index) => (
                        <li key={index}>
                            <div>
                                <button value={acc._id} onClick={(e) => UpdateAccount(e)}>
                                    Update
                                </button>
                                <button value={acc._id} onClick={(e) => DeleteAccount(e)}>
                                    Delete
                                </button>
                            </div>
                            <p className="rounded-gray">{acc.platform}</p>
                            <p className="rounded-gray">{acc.accNo}</p>
                            <p className="rounded-gray">{acc.server}</p>
                            <p className="rounded-gray">{acc.broker}</p>
                            {acc.masterId ? (
                                <span className="rounded-gray">Master</span>
                            ) : (
                                <Link to="/masterConnect" className="rounded-gray">
                                    ربط الحساب
                                </Link>
                            )}
                            {acc.masterId ? (
                                <button
                                    value={acc.accNo}
                                    className="rounded-gray"
                                    onClick={deleteMaster}
                                >
                                    <span>Master</span>
                                    <i class="bi bi-trash-fill"></i>
                                </button>
                            ) : (
                                <span className="rounded-gray">تحت المراجعة</span>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
            {openUpgrad && (
                <UpgradeToMaster
                    setOpenUpgrad={setOpenUpgrad}
                    accountsNum={accountsNum}
                    getAccounts={getAccounts}
                />
            )}

            {openAddAccount && (
                <AddBrokerAcc setOpenAddAccount={setOpenAddAccount} getAccounts={getAccounts} />
            )}
        </>
    );
}

export default AccountClient;
