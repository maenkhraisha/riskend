import { BrokerAccount } from "../models/BrokerAccount.js";
import jwt from "jsonwebtoken";

const getBrokerAccounts = async (req, res) => {
    const decode = await jwt.verify(req.cookies.CusRefreshToken, process.env.REFRESH_TOKEN_SECRET);
    const cusId = decode.id;

    try {
        const brokerAccounts = await BrokerAccount.find({ cusId: cusId })
            .populate("status")
            .populate({
                path: "linkId",
                populate: {
                    path: "masterId",
                    model: "BrokerAccount",
                    populate: {
                        path: "cusId",
                        model: "Customer",
                    },
                },
            });

        res.set("Access-Control-Allow-Origin", "http://localhost:3000");
        res.json({ brokerAccounts: brokerAccounts });
    } catch (error) {
        res.json({ msg: "error in get broker Accounts" });
        console.log(error);
    }
};

const getAllBrokerAccounts = async (req, res) => {
    const decode = await jwt.verify(req.cookies.CusRefreshToken, process.env.REFRESH_TOKEN_SECRET);
    const cusId = decode.id;

    try {
        const brokerAccounts = await BrokerAccount.find().populate("cusId").populate("status");

        res.json({ brokerAccounts: brokerAccounts });
    } catch (error) {
        res.json({ msg: "error in get broker Accounts" });
        console.log(error);
    }
};

const addBrokerAcc = async (req, res) => {
    const { cusId, platform, password, accNo, server, broker } = req.body;

    const newBrokerAcc = new BrokerAccount({
        cusId,
        platform,
        password,
        accNo,
        server,
        broker,
    });

    try {
        const response = await newBrokerAcc.save();
    } catch (error) {
        console.log(error);
    }

    res.json({ message: "Add successfully" });
};
const updateBrokerAcc = async (req, res) => {
    const { id, accNo, password, server, broker, status } = req.body.data;

    try {
        const response = await BrokerAccount.findByIdAndUpdate(
            { _id: id },
            {
                accNo: accNo,
                password: password,
                server: server,
                broker: broker,
                status: status,
            }
        );

        res.json({ meg: "update successfully" });
    } catch (error) {
        console.log(error);
    }
};
const deleteBrokerAcc = async (req, res) => {
    const id = req.body.id;

    if (id == undefined) {
        return res.json({ message: "Id not defined" });
    }

    try {
        const response = await BrokerAccount.deleteOne({ _id: id });
    } catch (error) {
        console.log(error);
    }

    res.json({ message: "Deleted successfuly" });
};

const controllers = {
    getBrokerAccounts,
    getAllBrokerAccounts,
    addBrokerAcc,
    updateBrokerAcc,
    deleteBrokerAcc,
};

export { controllers as brokerAccController };
