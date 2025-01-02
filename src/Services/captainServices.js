const captainModel = require("../modals/captainModel");
const bcrypt = require("bcrypt");

const createUser = async ({ fullName, email, password, vehicle }) => {
    try {
        const { color, plate, capacity, vehicleType } = vehicle; // Destructure vehicle fields
        if (!fullName || !fullName.firstName || !fullName.lastName || !email || !password || !color || !plate || !vehicleType || !capacity) {
            throw new Error("All user details are required");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const captains = await captainModel.create({
            fullName,
            email,
            password: hashedPassword,
            vehicle
        });
    
        console.log(captains);
        
        return captains;
    } catch (error) {
        throw error;
    }
};

module.exports = createUser;
