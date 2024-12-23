const uberModel = require("../modals/uberModals");
const bcrypt = require("bcrypt");

const createUser = async ({ fullName, email, password }) => {
    try {
        if (!fullName || !fullName.firstName || !fullName.lastName || !email || !password) {
            throw new Error("All user details are required");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        console.log("name   ",fullName);
        

        const user = await uberModel.create({
            fullName,
            email,
            password: hashedPassword,
        });

        // const u = await uberModel.findById('67613ba6c85a73e9c8e42d2f')

        // console.log(u , "uuu")
        return user;
    } catch (error) {
        throw error;
    }
};

module.exports = createUser;
