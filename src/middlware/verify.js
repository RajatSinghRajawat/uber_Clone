const jwt = require('jsonwebtoken');
const BlacklistedToken = require('../modals/blacklistToken');

const verificationuser = async (req, res, next) => {
    try {
        // Extract token from headers
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(" ")[1];

        if (!token) {
            return next({ status: 401, message: "Authorization token is required" });
        }

        // Verify the token
        jwt.verify(token, "secret", (err, decoded) => {
            if (err) {
                console.error("JWT Verification Error:", err);
                return next({ status: 403, message: "Invalid or expired token" });
            }

            req.user = decoded; // Attach decoded token to `req.user`
            console.log("User verified:", req.user);
            next(); // Proceed to the next middleware
        });
    } catch (error) {
        console.error("Error during token verification:", error);
        next({ status: 500, message: "Internal Server Error" });
    }
};

const verificationCaptain = async (req, res, next) => {
    try {
        // Extract token from headers
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(" ")[1];

        console.log("im in the captain verification")
        if (!token) {
            return next({ status: 401, message: "Authorization token is required" });
        }

        // Uncomment to check for blacklisted tokens
        // const isBlacklisted = await BlacklistedToken.findOne({ token });
        // if (isBlacklisted) {
        //     return res.status(401).json({ message: "Unauthorized: Token is blacklisted" });
        // }

        // Verify the token
        jwt.verify(token, process.env.captain_secret, (err, decoded) => {
            if (err) {
                console.error("JWT Verification Error:", err);
                return next({ status: 403, message: "Invalid or expired token" });
            }

            req.captain = decoded; // Attach decoded token to `req.captain`
            console.log("Captain verified:", req.captain);
            next(); // Proceed to the next middleware
        });
    } catch (error) {
        console.error("Error during token verification:", error);
        next({ status: 500, message: "Internal Server Error" });
    }
};

module.exports = { verificationuser, verificationCaptain };
