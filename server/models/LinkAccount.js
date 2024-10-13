import mongoose from "mongoose";

const LinkAccountSchema = new mongoose.Schema({
    brokerId: {
        type: mongoose.Schema.Types.ObjectId,
        unique: true,
        ref: "BrokerAccount",
        require: true,
    },
    masterId: { type: mongoose.Schema.Types.ObjectId, ref: "BrokerAccount", require: true },
    risk: { type: Number },
    period: { type: String },
    status: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Status",
        require: true,
    },
});

const LinkAccountModel = mongoose.model("LinkAccount", LinkAccountSchema);

export { LinkAccountModel as LinkAccount };
