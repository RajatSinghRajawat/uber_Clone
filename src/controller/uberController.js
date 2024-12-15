const { validationResult } = require("express-validator");
const uberModel = require("../modals/uberModals");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createUser = require("../Services/uberServices");

const registerUser = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        // Ensure all required fields are provided
        if (!fullName || !fullName.firstName || !fullName.lastName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if user with the email already exists
        const existingUser = await uberModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = await createUser({
            fullName: {
                firstName: fullName.firstName,
                lastName: fullName.lastName,
            },
            email,
            password: hashedPassword,
        });

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET || "default_secret",
            { expiresIn: "1h" }
        );

        // Send the response
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

module.exports = { registerUser };
