const uberModel = require("../modals/uberModals");
const bcrypt = require("bcrypt");

const createUser = async ({ fullName, email, password }) => {
    try {
        if (!fullName || !fullName.firstName || !fullName.lastName || !email || !password) {
            throw new Error("All user details are required");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await uberModel.create({
            fullName: {
                firstName: fullName.firstName,
                lastName: fullName.lastName,
            },
            email,
            password: hashedPassword,
        });

        return user;
    } catch (error) {
        throw error;
    }
};

module.exports = createUser;
