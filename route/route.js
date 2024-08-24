import express from "express"
import { getLocation, addSchool, addBulkData, startServer } from "../controller/location.controller.js";
import { addLocationValidation } from "../middleware/add.validate.js";

const route = express.Router()

route.get("/", startServer)
route.get("/listSchools", getLocation)
route.post("/addSchool", addLocationValidation, addSchool)
route.post("/bulk", addBulkData)


export default route;