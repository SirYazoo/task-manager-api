const jwt = require("jsonwebtoken");
require("dotenv").config();

/**
 * @desc    Gatekeeper middleware to verify JWT from authorization header
 * @route   Middleware - Applied to protected routes
 * @access  Private
 * @throws  {401} If token is missing, invalid, or expired
 */
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = decoded;

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = { protect };
