import mongoose from "mongoose";

const CountrySchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
});

const CountryModel = new mongoose.model("Country", CountrySchema);

export { CountryModel as Country };
