// essential external libraries
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDb from "./config/db.js";

// ext library -  to beautify the terminal
import colors from "colors";

// my own middlewares
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";

// routes
import pollroutes from "./routes/pollroutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import voteRoutes from "./routes/voteRoutes.js";
import ninRoutes from "./routes/ninRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

// config
dotenv.config();
connectDb();

const PORT = process.env.PORT || 3030;
// const HOSTNAME = process.env.HOSTNAME;

console.log("process.env.PORT :>> ", process.env.PORT);

// express middleware
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());

// routes
app.use("/api/category", categoryRoutes);
app.use("/api/polls", pollroutes);
app.use("/api/vote", voteRoutes);
app.use("/api/nin", ninRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, () => console.log(`Server running on::${PORT}`.yellow.bold));

// app middlewares
app.use(notFound);
app.use(errorHandler);
