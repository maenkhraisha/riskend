import mongoose from "mongoose";

const BrokerAccSchema = new mongoose.Schema({
    cusId: { type: String, require: true, trim: true },
    platform: { type: String, require: true, trim: true },
    password: { type: String, require: true, trim: true },
    accNo: { type: String, require: true, trim: true },
    server: { type: String, require: true, trim: true },
    broker: { type: String, require: true, trim: true },
    linkAcc: { type: String, trim: true },
    status: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Status",
        require: true,
    },
});

const BrokerAccModel = mongoose.model("BrokerAcc", BrokerAccSchema);

export { BrokerAccModel as BrokerAcc };
