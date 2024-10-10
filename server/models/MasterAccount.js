import mongoose from "mongoose";

const MasterAccountSchema = new mongoose.Schema({
    monthlySubscr: { type: Number, require: true, trim: true },
    minCapital: { type: Number, require: true, trim: true },
    minMonthlyProfit: { type: Number, trim: true },
    customerSubscr: { type: Number, trim: true },
    usdt: { type: String, trim: true, default: "usdt" },
});

const MasterAccountModel = mongoose.model("MasterAccount", MasterAccountSchema);

export { MasterAccountModel as MasterAccount };
