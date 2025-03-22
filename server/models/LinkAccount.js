import mongoose from "mongoose";

const LinkAccountSchema = new mongoose.Schema(
    {
        brokerId: {
            type: mongoose.Schema.Types.ObjectId,
            unique: true,
            ref: "BrokerAccount",
            require: true,
        },
        masterId: { type: mongoose.Schema.Types.ObjectId, ref: "BrokerAccount", require: true },
        risk: { type: mongoose.Schema.Types.ObjectId, ref: "Risk", require: true },
        period: { type: mongoose.Schema.Types.ObjectId, ref: "Period", require: true },
        status: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Status",
            require: true,
        },
        price: { type: Number },
    },
    { timestamps: true }
);

const LinkAccountModel = mongoose.model("LinkAccount", LinkAccountSchema);

export { LinkAccountModel as LinkAccount };
