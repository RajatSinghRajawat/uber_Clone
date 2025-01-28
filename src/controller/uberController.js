const { validationResult } = require("express-validator");
const uberModel = require("../modals/uberModals");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createUser = require("../Services/uberServices");
const BlacklistedToken = require("../modals/blacklistToken");



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
        // console.log(password, 'im here')
        // const hashedPassword = await bcrypt.hash(password, 10 , function(err , res){

        //     if(err){
        //         console.log(err , "err")
        //     }
        //     console.log(res , "ressss pass")
        //     return res
        // });

        // const hashedPassword = await bcrypt.hash(password , 10)


        // console.log(hashedPassword , "hp")

        // return 0 ;
        const user = await createUser({
            fullName,
            email,
            password: password,
        });
        // console.log(user, "user create")
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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { email, password } = req.body;
        const userS = await uberModel.findOne({ email });
        console.log(userS);

        if (!userS) {
            return res.status(400).json({ message: "User with this email already exists" });
        }

        const isPasswordValid = await bcrypt.compare(password, userS.password);
        // console.log(password, userS.password, "pass")
        // console.log(isPasswordValid, "llllllllllllllll");
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const payload = { email: userS.email };
        const token = jwt.sign(payload, 'secret', { expiresIn: '24h' });
        const tokenUpdate = await uberModel.updateOne({ token });

        if (!tokenUpdate.modifiedCount) {
            return res.status(500).json({ status: "002", message: "Failed to update token" });
        }

        res.status(200).json({ message: "Login successful", token, userS });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

const getProfile = async (req, res) => {
    // console.log(req.user); 
    if (!req.user) {
        return res.status(401).json({ error: "Unauthorized: User not found" });
    }

    const userdetails = await uberModel.findOne({email:req.user.email})

    res.status(200).send({ user: userdetails , message:"profile created successfully" });
};

const logout = async (req, res) => {


    const { email } = req.body;

    try {
        const Cheackuser = await uberModel.findOne({ email })
        if (!Cheackuser) {
            return res.json({ status: false, error: "Invalid Email" });
        }
        const user = await uberModel.findOneAndUpdate(
            { email },
            { token: null }
        );
        if (!user) {
            return res.status(404).json({ status: false, error: "User not found" });
        }

        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(400).json({ message: 'No token provided' });
        }

        // Blacklist the token
        await BlacklistedToken.create({ token });

        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error('Error during logout:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



module.exports = { registerUser, loginUser, getProfile, logout };
