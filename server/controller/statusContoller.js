import { Status } from "../models/Status.js";

const getStatus = async (req, res) => {
    const user = req.params.id;
    try {
        const status = await Status.find();

        res.json({ status: status });
    } catch (error) {
        res.json({ msg: "error in get countries" });
        console.log(error);
    }
};
const addStatus = async (req, res) => {
    const { name } = req.body;

    const newStatus = new Status({
        name,
    });

    try {
        const response = await newStatus.save();
    } catch (error) {
        console.log(error);
    }

    res.json({ message: "Add successfully" });
};
const updateStatus = (req, res) => {};
const deleteStatus = async (req, res) => {
    const { id } = req.body;

    if (id == undefined) {
        return res.json({ message: "Id not defined" });
    }

    try {
        const response = await Status.findOneAndDelete({ _id: id });
    } catch (error) {
        console.log(error);
    }

    res.json({ message: "Deleted successfuly" });
};

const controllers = {
    getStatus,
    addStatus,
    updateStatus,
    deleteStatus,
};

export { controllers as statusController };
