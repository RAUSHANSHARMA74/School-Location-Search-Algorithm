

const addLocationValidation = (req, res, next) => {
    const { name, address, latitude, longitude } = req.body;

    if (!name || !address || latitude === undefined || longitude === undefined) {
        return res.status(400).json({
            message: "Please provide all required fields: name, address, latitude, and longitude."
        });
    }

    if (name.trim() === "" || address.trim() === "") {
        return res.status(400).json({
            message: "Name and address cannot be empty."
        });
    }

    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);

    if (isNaN(lat) || isNaN(lon)) {
        return res.status(400).json({
            message: "Latitude and longitude must be valid numbers."
        });
    }

    if (lat < -90 || lat > 90) {
        return res.status(400).json({
            message: "Latitude must be between -90 and 90 degrees."
        });
    }

    if (lon < -180 || lon > 180) {
        return res.status(400).json({
            message: "Longitude must be between -180 and 180 degrees."
        });
    }

    next();
};


export { addLocationValidation }