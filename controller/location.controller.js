import LocationModel from "../model/location.model.js";
import { exec } from "child_process";

const latitudeAndLongitude = () => {
    return new Promise((resolve, reject) => {
        exec('curl -s ipinfo.io', (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return reject({ message: 'Error fetching location' });
            }
            try {
                const location = JSON.parse(stdout);
                const [lat, long] = location.loc.split(',');
                resolve({ lat, long });
            } catch (parseError) {
                reject({ message: 'Error parsing location data' });
            }
        });
    });
}

const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRadians = (degree) => (degree * Math.PI) / 180;

    const R = 6371;
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance;
};


const getLocation = async (req, res) => {
    try {
        const { lat, long } = await latitudeAndLongitude();

        if (!lat || !long) {
            return res.status(400).json({ message: "Latitude and longitude are required" });
        }

        const latitude = parseFloat(lat);
        const longitude = parseFloat(long);

        const locations = await LocationModel.findAll();

        const locationsWithDistance = locations.map(location => {
            const distance = calculateDistance(latitude, longitude, location.latitude, location.longitude);
            return { ...location.dataValues, distance };
        });

        locationsWithDistance.sort((a, b) => a.distance - b.distance);

        res.status(200).json({ message: "Locations sorted by distance", data: locationsWithDistance });
    } catch (error) {
        console.error("Error in getLocation API:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};



const addSchool = async (req, res) => {
    try {
        const newLocation = await LocationModel.create(req.body);
        res.status(201).json({ message: "School location added successfully.", data: newLocation });
    } catch (error) {
        console.error("Error adding location:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

const addBulkData = async (req, res) => {
    try {
        const locations = await LocationModel.bulkCreate(req.body);
        res.status(200).json({ message: "Bulk data added successfully", data: locations });
    } catch (error) {
        console.error("Error in addBulkData API:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};



export { getLocation, addSchool, addBulkData }