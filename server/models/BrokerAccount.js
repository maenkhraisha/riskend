import mongoose from "mongoose";

const BrokerAccountSchema = new mongoose.Schema({
    cusId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", require: true },
    platform: { type: String, require: true, trim: true },
    password: { type: String, require: true, trim: true },
    accNo: { type: String, require: true, trim: true, unique: true },
    server: { type: String, require: true, trim: true },
    broker: { type: String, require: true, trim: true },
    linkAcc: { type: String, trim: true },
    status: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Status",
        require: true,
    },
    masterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MasterAccount",
    },
    linkId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "LinkAccount",
    },
});

const BrokerAccountModel = mongoose.model("BrokerAccount", BrokerAccountSchema);

export { BrokerAccountModel as BrokerAccount };
