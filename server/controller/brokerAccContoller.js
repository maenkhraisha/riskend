import { BrokerAccount } from "../models/BrokerAccount.js";

const getBrokerAccounts = async (req, res) => {
    const cusId = req.params.id;

    try {
        const brokerAccounts = await BrokerAccount.find({ cusId: cusId });

        res.json({ brokerAccounts: brokerAccounts });
    } catch (error) {
        res.json({ msg: "error in get brokerAccounts" });
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
const updateBrokerAcc = (req, res) => {};
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
    addBrokerAcc,
    updateBrokerAcc,
    deleteBrokerAcc,
};

export { controllers as brokerAccController };
