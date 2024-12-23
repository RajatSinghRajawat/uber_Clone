const jwt = require('jsonwebtoken');

const verification = (req, res, next) => {
    try {
        // Extract token from cookies or headers
        const authHeader = req.headers.authorization;
        const token =authHeader && authHeader.split(" ")[1];

        if (!token) {
            return next({ status: 401, message: "Authorization token is required" });
        }

        jwt.verify(token, "secret", (err, decoded) => {
            if (err) {
                console.error("JWT Verification Error:", err);
                return next({ status: 403, message: "Invalid or expired token" });
            }

            req.user = decoded; // Attach decoded token to `req.user`
            console.log(req.user);
            res.send({message:"verify"})
            next(); // Proceed to the next middleware
        });
    } catch (error) {
        console.error("Error during token verification:", error);
        next({ status: 500, message: "Internal Server Error" });
    }
};

module.exports = verification;
