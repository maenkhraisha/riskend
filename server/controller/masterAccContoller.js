import jwt from "jsonwebtoken";
import { MasterAccount } from "../models/MasterAccount.js";
import { BrokerAccount } from "../models/BrokerAccount.js";

const getMasterAccounts = async (req, res) => {
    try {
        const masters = await BrokerAccount.find({ masterId: { $ne: null } })
            .populate("masterId")
            .populate("cusId");

        res.json({ masters: masters });
    } catch (error) {
        res.json({ msg: "error in get master account" });
        console.log(error);
    }
};

const getMasterAccountsConnect = async (req, res) => {
    const decode = await jwt.verify(req.cookies.CusRefreshToken, process.env.REFRESH_TOKEN_SECRET);
    if (decode) {
        try {
            const masters = await BrokerAccount.find({
                masterId: { $ne: null },
                cusId: { $ne: decode.id },
            })
                .populate("masterId")
                .populate("cusId");

            res.json({ masters: masters });
        } catch (error) {
            res.json({ msg: "error in get master account" });
            console.log(error);
        }
    } else {
        res.json({ msg: "error in get master account" });
    }
};

const addMasterAcc = async (req, res) => {
    const { accNo, monthlySubscr, minCapital, minMonthlyProfit, customerSubscr, usdt } =
        req.body.data;

    const newMasterAcc = new MasterAccount({
        monthlySubscr,
        minCapital,
        minMonthlyProfit,
        customerSubscr,
        usdt,
    });

    try {
        const response = await newMasterAcc.save();
        console.log(response._id);

        const res = await BrokerAccount.findOneAndUpdate(
            { accNo: accNo },
            { masterId: response._id }
        );
    } catch (error) {
        console.log(error);
    }

    res.json({ message: "Add successfully" });
};
const updateMasterAcc = (req, res) => {};
const deleteMasterAcc = async (req, res) => {
    const accNo = req.body.accNo;

    if (accNo == undefined) {
        return res.json({ message: "Id not defined" });
    }

    try {
        const response = await BrokerAccount.findOneAndUpdate({ accNo: accNo }, { masterId: null });

        const res = await MasterAccount.deleteOne({ _id: response.masterId });
    } catch (error) {
        console.log(error);
    }

    res.json({ message: "Deleted successfuly" });
};

const controllers = {
    getMasterAccounts,
    getMasterAccountsConnect,
    addMasterAcc,
    updateMasterAcc,
    deleteMasterAcc,
};

export { controllers as masterAccController };
