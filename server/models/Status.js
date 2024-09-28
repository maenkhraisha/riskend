import mongoose from "mongoose";

const StatusSchema = new mongoose.Schema({
    name: { type: String, require: true, trim: true, unique: true },
});

const StatusModel = mongoose.model("Status", StatusSchema);

export { StatusModel as Status };
