import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema({
    name: { type: String, require: true, trim: true, unique: true },
    email: { type: String, require: true, trim: true, unique: true },
    telephone: { type: Number, require: true },
    pwd: { type: String, require: true, trim: true },
    country: { type: mongoose.Schema.Types.ObjectId, ref: "Country", require: true },
    gender: { type: String, enum: ["male", "female"], default: "male" },
    birthDate: { type: String },
    image: { type: String },
    refreshToken: { type: String, trim: true },
});

const CustomerModel = mongoose.model("Customer", CustomerSchema);

export { CustomerModel as Customer };
