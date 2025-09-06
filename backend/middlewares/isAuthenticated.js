import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // 1. Check if Authorization header exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    // 2. Extract token from "Bearer <token>"
    const token = authHeader.split(" ")[1];
    console.log("Token received:", token); // Debug log

    // 3. Validate token existence
    if (!token || token === "undefined" || token === "null") {
      return res.status(401).json({ message: "Invalid token" });
    }

    // 4. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 5. Attach decoded user data to req
    req.user = decoded;

    next();
  } catch (error) {
    console.error("JWT Error:", error.message);
    return res.status(401).json({ message: "Unauthorized, token invalid" });
  }
};

export default isAuthenticated;
