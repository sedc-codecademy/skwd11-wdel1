import "dotenv/config.js";
import express from "express";
import mongoose from "mongoose";
import { globalRouter } from "./const/global-router.const.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import cors from "cors";
import helmet from "helmet";

const { MONGO_USER, MONGO_PASSWORD, MONGO_CLUSTER, MONGO_DB } = process.env;

const MONGO_URI = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_CLUSTER}/${MONGO_DB}?retryWrites=true&w=majority`;

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/api", globalRouter);

app.use(errorHandler);

app.listen(PORT, HOST, async () => {
  try {
    await mongoose.connect(MONGO_URI);

    console.log("Connected to MongoDB");

    console.log(`The server is up at port: ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
