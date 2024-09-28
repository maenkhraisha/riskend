import { BrokerAcc } from "../models/BrokerAcc.js";

const getBrokerAccounts = async (req, res) => {
    const user = req.params.id;
    try {
        const brokerAccounties = await BrokerAcc.find();

        res.json({ brokerAccounties: brokerAccounties });
    } catch (error) {
        res.json({ msg: "error in get brokerAccounties" });
        console.log(error);
    }
};
const addBrokerAcc = async (req, res) => {
    const { cusId, platform, password, accNo, server, broker } = req.body;

    const newBrokerAcc = new BrokerAcc({
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
    const { id } = req.body;

    if (id == undefined) {
        return res.json({ message: "Id not defined" });
    }

    try {
        const response = await BrokerAcc.findOneAndDelete({ _id: id });
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
