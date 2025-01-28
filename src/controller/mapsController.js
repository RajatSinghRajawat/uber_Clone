const { validationResult } = require("express-validator");
const { getAddressCoordinates, getDistanceTime, getAutoSuggesstions } = require("../Services/mapsServices");

const getCordinate = async (req, res, next) => {


    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { address } = req.query;
    console.log(req.query);

    try {
        if (!address) {
            return res.status(400).json({ message: "Address parameter is required" });
        }

        console.log("Received address:", address);

        const coordinates = await getAddressCoordinates(address);
        console.log("Coordinates fetched:", coordinates);

        return res.status(200).json({ data: coordinates });
    } catch (error) {
        console.error("Error fetching coordinates:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};



const getDistance = async (req, res) => {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { origin, destination } = req.query;
        console.log(req.query);


        const distanceTime = await getDistanceTime(origin, destination)
        res.status(200).json({ message: "getDistance successfuly", r: distanceTime })

    } catch (error) {
        console.log(error);
    }
}


const suggestions = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        const { input } = req.query;
        console.log(req.query);

        const suggestions = await getAutoSuggesstions(input)
        console.log("Coordinates fetched:", suggestions);
        console.error("Error fetching coordinates:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });




    } catch (error) {
        console.log(error);

    }
}

module.exports = { getCordinate, getDistance, suggestions };
