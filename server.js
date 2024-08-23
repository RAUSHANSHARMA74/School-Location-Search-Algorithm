// server.js
import express from "express";
import dotenv from "dotenv";
import sequelize from "./config/connection.js";
import route from "./route/route.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use("/", route);

const port = process.env.PORT || 3050;

sequelize.sync()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}\nhttp://localhost:${port}/`);
        });
    })
    .catch(err => {
        console.error('Unable to sync the database:', err);
    });
