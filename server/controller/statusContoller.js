import { Status } from "../models/Status.js";

const getStatus = async (req, res) => {
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

    try {
        const response = await Status.find();
        const count = response.length;
        let isdefault = 0;
        count == 0 ? (isdefault = true) : (isdefault = false);

        console.log(isdefault);

        const newStatus = new Status({
            number: count + 1,
            name,
            isdefault: isdefault,
        });
        const saveresponse = await newStatus.save();
        res.json({ message: "Add successfully" });
    } catch (error) {
        console.log(error);
        return res.json({ message: "Add failed" });
    }
};
const updateStatus = async (req, res) => {
    const { id, name, number, isdefault } = req.body.data;

    try {
        if (isdefault) {
            await Status.updateMany({ isdefault: false });
        }
        await Status.findOneAndUpdate(
            { _id: id },
            { name: name, number: number, isdefault: isdefault }
        );
        return res.json({ msg: "update successfully" });
    } catch (error) {
        console.log(error);
        return res.json({ msg: "update failed" });
    }
};
const deleteStatus = async (req, res) => {
    const { id } = req.body;

    if (id == undefined) {
        return res.json({ message: "Id not defined" });
    }

    try {
        const response = await Status.findById({ _id: id });
        if (response.isdefault == true) {
            res.json({ msg: "you cannot delete default status" });
        } else {
            await Status.findOneAndDelete({ _id: id });

            res.json({ message: "Deleted successfuly" });
        }
    } catch (error) {
        console.log(error);
        res.json({ msg: "deleted Failed" });
    }
};

const controllers = {
    getStatus,
    addStatus,
    updateStatus,
    deleteStatus,
};

export { controllers as statusController };
