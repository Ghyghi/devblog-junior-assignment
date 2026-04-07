import { User } from "../models/userModel.js";
import pkg from "jsonwebtoken";
const { verify } = pkg;

/**
 * Authentication middleware
 *
 * Verifies a Bearer JWT in the `Authorization` header, fetches the user and
 * attaches it to `req.user`. On failure, responds with 401 and an error message.
 *
 * Expected header: Authorization: Bearer <token>
 */
export async function protect(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = verify(token, process.env.JWT_SECRET);

        if (decoded.exp && Date.now() >= decoded.exp * 1000) {
            return res.status(401).json({ message: "Token has expired" });
        }

        const user = await User.findByPk(decoded.id, {
            attributes: [
                "id",
                "username",
                "email",
                "createdAt",
                "updatedAt",
            ],
        });

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user = user;
        next();
    } catch (err) {
        console.error("JWT Error:", err.message);

        let message = "Unauthorized";
        if (err.name === "TokenExpiredError") {
            message = "Token has expired";
        } else if (err.name === "JsonWebTokenError") {
            message = "Invalid token format";
        }

        res.status(401).json({ message });
    }
}
