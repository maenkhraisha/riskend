import express from "express";
import DBConn from "./config/DB_conn.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import verifyJWT from "./middleware/verifyJWT.js";

import { userRouter } from "./routes/userRoute.js";
import { customerRouter } from "./routes/customerRoute.js";
import { registerRouter } from "./routes/registerRoute.js";
import { countryRouter } from "./routes/countryRoute.js";
import { riskRouter } from "./routes/riskRoute.js";
import { periodRouter } from "./routes/periodRoute.js";
import { brokerAccRouter } from "./routes/brokerAccRoute.js";
import { masterAccRouter } from "./routes/masterAccRoute.js";
import { linkAccRouter } from "./routes/linkAccRoute.js";
import { statusRouter } from "./routes/statusRoute.js";
import { statusMasterRouter } from "./routes/statusMasterRoute.js";
import { refreshRouter } from "./routes/refreshRoute.js";
import { cusRefreshRouter } from "./routes/cusRefreshRoute.js";
import corsOptions from "./config/corsOptions.js";
import credentials from "./middleware/credentials.js";

dotenv.config();
const app = express();

// const corsoptions = {
//     origin: ["http://localhost:3000", "https://riskend-client.onrender.com"],
//     credentials: true,
// };
// app.use(cors(corsoptions));

app.use(credentials);
app.use(cors(corsOptions));

app.use(cookieParser());
app.use(express.json());
app.use("/auth", userRouter);
app.use("/refresh", refreshRouter);
app.use("/cusRefresh", cusRefreshRouter);

app.use("/customer", customerRouter);

app.use("/country", countryRouter);
app.use(verifyJWT);

app.use("/risk", riskRouter);
app.use("/period", periodRouter);
app.use("/broker-acc", brokerAccRouter);
app.use("/master-acc", masterAccRouter);
app.use("/link-acc", linkAccRouter);
app.use("/status", statusRouter);
app.use("/status-master", statusMasterRouter);
app.use("/signup", registerRouter);

app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
});

DBConn();
