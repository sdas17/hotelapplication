var jwt = require('jsonwebtoken');
const { use } = require('passport');
const jwtAuthMiddleware = (req, res, next) => {
    const authorization = req.headers.authorization;
    console.log(authorization, req, res, next, '5');


    // Check if the authorization header exists and contains "Bearer"
    if (!authorization || !authorization.startsWith('Bearer ')) {
        return res.status(401).json({ error: "Unauthorized. No valid token provided." });
    }

    try {
        // Extract the JWT token from the authorization header
        const token = authorization.split(" ")[1];
        if (!token) return res.status(401).json({ error: "Unauthorized. Invalid token." });

        // Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach decoded user information to the request object
        req.user = decoded;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        return res.status(401).json({ error: "Unauthorized. Invalid token." });
    }
};
const generateToken = (userData) => {
    return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: 3000 })
}
module.exports = { jwtAuthMiddleware, generateToken };
