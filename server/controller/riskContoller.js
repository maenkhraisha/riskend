import { Risk } from "../models/Risk.js";

const getRisks = async (req, res) => {
    try {
        const risks = await Risk.find();

        res.json({ risks: risks });
    } catch (error) {
        res.json({ msg: "error in get risks" });
        console.log(error);
    }
};
const addRisk = async (req, res) => {
    const { name } = req.body;

    const newRisk = new Risk({
        name,
    });

    try {
        const response = await newRisk.save();
    } catch (error) {
        console.log(error);
    }

    res.json({ message: "Add successfully" });
};
const updateRisk = (req, res) => {};
const deleteRisk = async (req, res) => {
    const { id } = req.body;

    if (id == undefined) {
        return res.json({ message: "Id not defined" });
    }

    try {
        const response = await Risk.findOneAndDelete({ _id: id });
    } catch (error) {
        console.log(error);
    }

    res.json({ message: "Deleted successfuly" });
};

const controllers = {
    getRisks,
    addRisk,
    updateRisk,
    deleteRisk,
};

export { controllers as riskController };
