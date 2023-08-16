import express from "express";
import appRouter from "./src/routes";

const env = require("dotenv");
env.config();
const app = express();
app.use(express.json());
app.use("/api", appRouter);

app.listen(process.env.PORT, () => {
	console.log(`Server is running on port ${process.env.PORT}`);
});
