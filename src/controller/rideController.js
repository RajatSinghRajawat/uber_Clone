const { getDistance } = require("./mapsController");




const createRide = async (req, res) => {

}

 async function getfare(pickup,destination) {
    if (!pickup, !destination) {
        throw new Error("orgin and destination are required");
    }

    const distanceTime = await getDistance(pickup)

}