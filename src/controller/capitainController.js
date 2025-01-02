const captainModel = require("../modals/captainModel");
const createUser = require("../Services/captainServices");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const registerCaptain = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { fullName, email, password, vehicle } = req.body;
        if (!fullName || !fullName.firstName || !fullName.lastName || !email || !password || !vehicle) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const isCaptainExistingUser = await captainModel.findOne({ email });
        if (isCaptainExistingUser) {
            return res.status(400).json({ message: "Captain user with this email already exists" });
        }

        const captain = await createUser({
            fullName,
            email,
            password,
            vehicle
        });
        console.log(vehicle.capacity, "sssssssssssssssssss");


        const token = jwt.sign(
            { id: captain._id, email: captain.email }, // Changed from `user` to `captain`
            process.env.JWT_SECRET || "default_secret",
            { expiresIn: "1h" }
        );

        res.status(201).json({ message: "Captain created successfully", token, captain });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message || "Server error" });
    }
};

const loginCaptain = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body);

    try {
        const { email, password } = req.body;

        const captainFind = await captainModel.findOne({ email });
        if (!captainFind) {
            return res.status(404).json({ message: "Captain not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, captainFind.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const payload = {
            id: captainFind._id,
            email: captainFind.email
        };
        const token = jwt.sign(payload, process.env.captain_secret, { expiresIn: "24h" });
        console.log(token);

        await captainModel.findByIdAndUpdate(captainFind._id, { token });

        res.status(200).json({
            message: "Login successful",
            token,
            captain: captainFind
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
}

const getprofileCaptain = async (req, res) => {
    console.log(req.captain, "cap");

    res.status(401).json({ captain: req.captain })
}

const logoutCaptain = async (req, res) => {


    const { email } = req.body;

    try {
        const CheackCaptain = await captainModel.findOne({ email })
        if (!CheackCaptain) {
            return res.json({ status: false, error: "Invalid Email" });
        }
        const captain = await captainModel.findOneAndUpdate(
            { email },
            { token: null }
        );
        if (!captain) {
            return res.status(404).json({ status: false, error: "User not found" });
        }

        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(400).json({ message: 'No token provided' });
        }


        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error('Error during logout:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
module.exports = { registerCaptain, loginCaptain, logoutCaptain, getprofileCaptain };
