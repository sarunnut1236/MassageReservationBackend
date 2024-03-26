const jwt = require("jsonwebtoken");
const User = require("../models/Users");

// Protect routes
exports.protect = async (_request, response, next) => {
    let token;

    if (
        _request.headers.authorization &&
        _request.headers.authorization.startsWith("Bearer")
    ) {
        token = _request.headers.authorization.split(" ")[1];
    }

    // Make sure token exists
    if (!token) {
        return response.status(401).json({
            success: false,
            message: "Not authorized to access this route",
        });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        _request.user = await User.findById(decoded.id);
        next();
    } catch (error) {
        console.error(error.stack);
        return response.status(401).json({
            success: false,
            message: "Not authorized to access this route",
        });
    }
};

// Grant access to specific roles
exports.authorize = (...roles) => {
    return (_request, response, next) => {
        if (!roles.includes(_request.user.role)) {
            return response.status(403).json({
                success: false,
                message: `User role ${_request.user.role} is not authorized to access this route`,
            });
        }
        next();
    };
};
