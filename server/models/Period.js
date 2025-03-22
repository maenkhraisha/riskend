import mongoose from "mongoose";

const PeriodSchema = new mongoose.Schema({
    name: { type: String, require: true, trim: true, unique: true },
    no_of_days: { type: Number, require: true },
});

const PeriodModel = mongoose.model("Period", PeriodSchema);

export { PeriodModel as Period };
