import { Period } from "../models/Period.js";

const getPeriods = async (req, res) => {
    try {
        const periods = await Period.find();

        res.json({ periods: periods });
    } catch (error) {
        res.json({ msg: "error in get risks" });
        console.log(error);
    }
};
const addPeriod = async (req, res) => {
    const { name, no_of_days } = req.body;

    const newPeriod = new Period({
        name,
        no_of_days,
    });

    try {
        const response = await newPeriod.save();
    } catch (error) {
        console.log(error);
    }

    res.json({ message: "Add successfully" });
};
const updatePeriod = (req, res) => {};
const deletePeriod = async (req, res) => {
    const { id } = req.body;

    if (id == undefined) {
        return res.json({ message: "Id not defined" });
    }

    try {
        const response = await Period.findOneAndDelete({ _id: id });
    } catch (error) {
        console.log(error);
    }

    res.json({ message: "Deleted successfuly" });
};

const controllers = {
    getPeriods,
    addPeriod,
    updatePeriod,
    deletePeriod,
};

export { controllers as periodController };
