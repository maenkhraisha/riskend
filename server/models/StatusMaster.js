import mongoose from "mongoose";

const StatusMasterSchema = new mongoose.Schema({
    number: { type: Number, require: true, unique: true },
    name: { type: String, require: true, trim: true, unique: true },
    isdefault: { type: Boolean },
});

const StatusMasterModel = mongoose.model("StatusMaster", StatusMasterSchema);

export { StatusMasterModel as StatusMaster };
