const { validationResult } = require("express-validator");
const uberModel = require("../modals/uberModals");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createUser = require("../Services/uberServices");



const registerUser = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })

    }
    try {
        const { fullName, email, password } = req.body;
        if (!fullName || !fullName.firstName || !fullName.lastName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const existingUser = await uberModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await createUser({
            fullName: {
                firstName: fullName.firstName,
                lastName: fullName.lastName,
            },
            email,
            password: hashedPassword,
        });
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET || "default_secret",
            { expiresIn: "1h" }
        );
        return res.status(201).json({
            message: "User registered successfully",
            token,
            user,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message || "Server error" });
    }
};



const loginUser = async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })

    }
    try {
        const { email, password } = req.body;

        const existingUser = await uberModel.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ status: "false", message: "Invalid password" });
        }

        const payload = { email: user.email };
        const token = jwt.sign(payload, 'secret', { expiresIn: '1h' });





    } catch (error) {

    }
}
module.exports = { registerUser, loginUser };
