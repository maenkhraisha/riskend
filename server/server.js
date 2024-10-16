import express from "express";
import DBConn from "./config/DB_conn.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import verifyJWT from "./middleware/verifyJWT.js";
import { userRouter } from "./routes/userRoute.js";
import { customerRouter } from "./routes/customerRoute.js";
import { registerRouter } from "./routes/registerRoute.js";
import { countryRouter } from "./routes/countryRoute.js";
import { brokerAccRouter } from "./routes/brokerAccRoute.js";
import { masterAccRouter } from "./routes/masterAccRoute.js";
import { linkAccRouter } from "./routes/linkAccRoute.js";
import { statusRouter } from "./routes/statusRoute.js";
import { refreshRouter } from "./routes/refreshRoute.js";
import { cusRefreshRouter } from "./routes/cusRefreshRoute.js";
dotenv.config();
const app = express();

const corsoptions = {
    origin: ["http://localhost:3000", "https://riskend-client.onrender.com"],
    credentials: true,
};
app.use(cors(corsoptions));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "https://riskend-client.onrender.com");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.use(cookieParser());
app.use(express.json());
app.use("/auth", userRouter);
app.use("/refresh", refreshRouter);
app.use("/cusRefresh", cusRefreshRouter);

app.use("/customer", customerRouter);

app.use("/country", countryRouter);
app.use(verifyJWT);

app.use("/broker-acc", brokerAccRouter);
app.use("/master-acc", masterAccRouter);
app.use("/link-acc", linkAccRouter);
app.use("/status", statusRouter);
app.use("/signup", registerRouter);

app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
});

DBConn();
