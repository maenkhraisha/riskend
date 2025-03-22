import { LinkAccount } from "../models/LinkAccount.js";
import { BrokerAccount } from "../models/BrokerAccount.js";
import jwt from "jsonwebtoken";

const getLinkAccounts = async (req, res) => {
    const decode = await jwt.verify(req.cookies.CusRefreshToken, process.env.REFRESH_TOKEN_SECRET);
    const cusId = decode.id;

    try {
        const linkAccounts = await LinkAccount.find()
            .populate("status")
            .populate("period")
            .populate("risk")
            .populate({
                path: "brokerId",
                match: { cusId: { $ne: cusId } },
                populate: {
                    path: "cusId",
                },
            });

        res.json({ linkAccounts: linkAccounts });
    } catch (error) {
        res.json({ msg: "error in get link Accounts" });
        console.log(error);
    }
};

const getAllLinkAccounts = async (req, res) => {
    try {
        const linkAccounts = await LinkAccount.find()
            .populate("period")
            .populate("risk")
            .populate("status")
            .populate({
                path: "brokerId",
                populate: {
                    path: "cusId",
                },
            })
            .populate({
                path: "masterId",
                populate: {
                    path: "cusId",
                },
            });

        res.json({ linkAccounts: linkAccounts });
    } catch (error) {
        res.json({ msg: "error in get link Accounts" });
        console.log(error);
    }
};

const addLinkAcc = async (req, res) => {
    const { brokerId, masterId, period, risk, price } = req.body;

    const newLinkAcc = new LinkAccount({
        brokerId,
        masterId,
        risk,
        period,
        price,
    });

    try {
        const response = await newLinkAcc.save();

        const res = await BrokerAccount.findOneAndUpdate(
            { _id: brokerId },
            { linkId: response._id }
        );
    } catch (error) {
        console.log(error);
        return res.json({ msg: "Add Failed" });
    }

    res.json({ msg: "Add successfully" });
};
const updateLinkAcc = async (req, res) => {
    const { id, status } = req.body.data;
    try {
        const response = await LinkAccount.findOneAndUpdate({ _id: id }, { status: status });
    } catch (error) {
        console.log(error);
    }
    res.json({ msg: "updated successfully" });
};
const deleteLinkAcc = async (req, res) => {
    const id = req.body.id;

    if (id == undefined) {
        return res.json({ message: "Id not defined" });
    }

    try {
        const response = await LinkAccount.deleteOne({ _id: id });
    } catch (error) {
        console.log(error);
    }

    res.json({ message: "Deleted successfuly" });
};

const controllers = {
    getAllLinkAccounts,
    getLinkAccounts,
    addLinkAcc,
    updateLinkAcc,
    deleteLinkAcc,
};

export { controllers as linkAccController };
