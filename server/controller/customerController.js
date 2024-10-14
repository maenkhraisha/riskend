import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { Customer } from "../models/Customer.js";

const signup = async (req, res) => {
    const { name, email, telephone, accountType, pwd, country } = req.body;

    const user = await Customer.findOne({ email });

    if (user) {
        return res.json({ message: "user exist" });
    }

    const hashedPassword = await bcrypt.hash(pwd, 10);

    try {
        await Customer.create({
            name,
            email,
            telephone,
            pwd: hashedPassword,
            country,
        });
        return res.json({ message: "User created successfully" });
    } catch (error) {
        console.log(error);
        return res.json({ message: "User created faild" });
    }
};

const login = async (req, res) => {
    const { email, pwd } = req.body;

    const customer = await Customer.findOne({ email });

    if (!customer) {
        return res.json({ status: false, message: "user not exist" });
    }

    const match = await bcrypt.compare(pwd, customer.pwd);

    if (!match) return res.json({ status: false, message: "password error" });

    const accessToken = jwt.sign({ email: customer.email, id: customer._id }, process.env.KEY, {
        expiresIn: "1h",
    });
    const refreshToken = jwt.sign(
        { email: customer.email, id: customer._id },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: "1d",
        }
    );

    customer.refreshToken = refreshToken;
    await customer.save();

    res.cookie("CusRefreshToken", refreshToken, { httpOnly: true });
    return res.json({ status: true, accessToken, message: "login successfuly" });
};

const logout = async (req, res) => {
    try {
        const refreshToken = req.cookies.CusRefreshToken;

        if (refreshToken) {
            const decode = await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
            if (decode) {
                res.clearCookie("CusRefreshToken");
                await Customer.updateOne({ email: decode.email }, { refreshToken: "" });
            } else {
                return res.json({ status: false, message: "not authorized" });
            }
        } else {
            return res.json({ status: false, message: "not authorized" });
        }
    } catch (error) {
        console.log(error);
    }

    res.json({ status: true, message: "Logout successfuly" });
};

const resetPassword = async (req, res) => {
    const { refreshToken } = req.params;
    const { password } = req.body;

    try {
        const decode = await jwt.verify(refreshToken, process.env.KEY);
        const id = decode.id;
        const hashPassword = await bcrypt.hash(password, 10);

        await Customer.findByIdAndUpdate({ _id: id }, { password: hashPassword });
    } catch (err) {
        console.log(err);
        return res.json({ status: false, message: "Invalid token" });
    }

    res.json({ status: true, message: "Reset password successfuly" });
};

const forgetPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const customer = await Customer.findOne({ email });
        if (!customer) {
            return res.json({ status: false, message: "no user found" });
        }

        const token = jwt.sign({ id: user.id }, process.env.KEY, { expiresIn: "1m" });

        // ==========================================
        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "maen.alkhraisha@gmail.com",
                pass: "rqlb mkdw zyia elzj",
            },
        });

        var mailOptions = {
            from: "maen.alkhraisha@gmail.com",
            to: customer.email,
            subject: "Reset Password",
            test: "",
            html: `<a href="${process.env.server_url}/resetPassword/${token}" target="_blank">Reset Password</a>`,
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent ");
            }
        });
        // =======================================
    } catch (error) {
        console.log(error);
    }

    res.json({ status: true, message: "Email sent successfuly" });
};
const getCustomers = async (req, res) => {
    try {
        const customers = await Customer.find().populate("country");
        return res.json({ customers });
    } catch (error) {
        console.log(error);
        return res.json({ msg: "faild" });
    }
};

const getCustomer = async (req, res) => {
    const id = req.params.id;
    try {
        const customer = await Customer.findById(id).populate("country");
        return res.json({ customer });
    } catch (error) {
        console.log(error);
        return res.json({ msg: "user not found" });
    }
};
const updateCustomer = async (req, res) => {
    const { _id, name, country, telephone, gender, birthDate, image } = req.body;

    const newcus = {
        name,
        country,
        telephone,
        gender,
        birthDate,
        image,
    };

    try {
        await Customer.findByIdAndUpdate({ _id: _id }, newcus);
    } catch (error) {
        console.log(error);
    }

    return res.json({ meg: "update" });
};

const updatePassword = async (req, res) => {
    const { id, pwd, pwdConfrim } = req.body;
    try {
        if (bcrypt.compare(pwd, pwdConfrim)) {
            const newPwd = await bcrypt.hash(pwd, 10);
            const response = await Customer.findOneAndUpdate({ _id: id }, { pwd: newPwd });

            return res.json({ msg: "Password updated" });
        } else {
            return res.json({ msg: "Password not match" });
        }
    } catch (error) {
        console.log(error);
        return res.json({ msg: "Password update Failed" });
    }
};

const controllers = {
    signup,
    login,
    logout,
    resetPassword,
    forgetPassword,
    getCustomers,
    getCustomer,
    updateCustomer,
    updatePassword,
};

export { controllers as customerController };
