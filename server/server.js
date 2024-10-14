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

// const corsoptions = {
//     origin: ["http://localhost:3000", "https://riskend-client.onrender.com"],
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"],
//     allowedHeaders: [
//         "Content-Type",
//         "Origin",
//         "X-Requested-With",
//         "Accept",
//         "x-client-key",
//         "x-client-token",
//         "x-client-secret",
//         "Authorization",
//     ],
//     credentials: true,
// };
// app.use(cookieParser());
// app.use(cors(corsoptions));
// app.options("*", cors(corsoptions));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", [
        "http://localhost:3000",
        "https://riskend-client.onrender.com",
    ]); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

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
