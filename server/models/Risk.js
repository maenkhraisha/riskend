import mongoose from "mongoose";

const RiskSchema = new mongoose.Schema({
    name: { type: String, require: true, trim: true, unique: true },
});

const RiskModel = mongoose.model("Risk", RiskSchema);

export { RiskModel as Risk };
