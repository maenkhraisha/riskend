import { Country } from "../models/Country.js";

const getCountries = async (req, res) => {
    const user = req.params.id;
    try {
        const countries = await Country.find();

        res.json({ countries: countries });
    } catch (error) {
        res.json({ msg: "error in get countries" });
        console.log(error);
    }
};
const addCountry = async (req, res) => {
    const { name } = req.body;

    const newCountry = new Country({
        name,
    });

    try {
        const response = await newCountry.save();
    } catch (error) {
        console.log(error);
    }

    res.json({ message: "Add successfully" });
};
const updateCountry = (req, res) => {};
const deleteCountry = async (req, res) => {
    const { id } = req.body;

    if (id == undefined) {
        return res.json({ message: "Id not defined" });
    }

    try {
        const response = await Country.findOneAndDelete({ _id: id });
    } catch (error) {
        console.log(error);
    }

    res.json({ message: "Deleted successfuly" });
};

const controllers = {
    getCountries,
    addCountry,
    updateCountry,
    deleteCountry,
};

export { controllers as countryController };
