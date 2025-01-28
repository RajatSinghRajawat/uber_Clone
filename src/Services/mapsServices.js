// const axios = require("axios");

// const getAddressCordinate = async (address) => {
// const apikey = process.env.GOOGLE_MAPS_API
// const url = `https://maps.gomaps.pro/maps/api/js?key=${apikey}&libraries=geometry,places`;

//     try {
//         const response = await axios.get(url);

//         if (response.data.status === 'OK') {
//             const location = response.data.results[0].geometry.location;
//             return {
//                 ltd: location.lat,
//                 lng: location.lng
//             };

//         } else {
//             throw new Error('Unable to find coordinates for the given address');
//         }
//     } catch (error) {
//         throw new Error(`Error getting coordinates: ${error.message}`);
//     }
// };


// module.exports = getAddressCordinate










const axios = require("axios");

const getAddressCoordinates = async (address) => {
    if (!address || typeof address !== "string") {
        throw new Error("Invalid address. Please provide a valid address as a string.");
    }

    const apikey = process.env._GOOGLE_MAPS_API_KEY;
    if (!apikey) {
        throw new Error("Google Maps API key is missing from environment variables.");
    }

    const encodedAddress = encodeURIComponent(address);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apikey}`;

    try {
        const response = await axios.get(url);

        if (response.data.status === "OK" && response.data.results.length > 0) {
            const location = response.data.results[0].geometry.location;
            return {
                lat: location.lat,
                lng: location.lng,
            };
        } else if (response.data.status === "ZERO_RESULTS") {
            throw new Error("No results found for the given address.");
        } else {
            throw new Error(`Error from Google Maps API: ${response.data.status}`);
        }
    } catch (error) {
        console.error("Error fetching coordinates:", error.response?.data || error.message);
        throw new Error(`Error getting coordinates: ${error.message}`);
    }
};

const getDistanceTime = async (origin, destination) => {
    if (!origin, !destination) {
        throw new Error("orgin and destination are required");
    }

    const apikey = process.env.GOOGLE_MAPS_API_KEY

    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=&key=${apikey}`;

    try {
        const response = await axios.get(url)
        console.log(response, "");

        if (response.data.status === "OK") {
            return response.data.rows[0].elements[0];
        } else {
            throw new Error("unable to distance time");
        }

    } catch (error) {

    }

}

const getAutoSuggesstions = async (input) => {
    if (!input) {
        throw new Error('query is required')
    }
    const apikey = process.env.GOOGLE_MAPS_API
    const url = `https://maps.gomaps.pro/maps/api/js?key=${apikey}&libraries=geometry,places`;



    try {
        const response = await axios.get(url)
        if (response.data.status === "OK") {
            return response.data.predictions
        } else {
            throw new Error("unable to fetch suggesstion");
        }
    }
    catch (error) {
        console.log(error);

    }
}

module.exports = { getAddressCoordinates, getDistanceTime, getAutoSuggesstions };
