// server.js
import express from "express";
import dotenv from "dotenv";
import route from "./route/route.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use("/", route);

const port = process.env.SERVER_PORT || 3050;


app.listen(port, () => {
    console.log(`Server is running on port ${port}\nhttp://localhost:${port}/`);
});