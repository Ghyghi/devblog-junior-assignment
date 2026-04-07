import { User } from "../models/userModel.js";
import { signToken } from "../utils/jwt.js";

/**
 * Authentication controller
 *
 * Exposes handlers for register, login and getting the authenticated user's profile.
 * Each handler expects Express-style (req, res) parameters. Errors are returned
 * as JSON with a relevant HTTP status code.
 */


export const register = async (req, res) => {
    try {
        const user = await User.create(req.body);
        if (!user) {
            return res
                .status(400)
                .json({ message: "User registration failed" });
        }

        const token = signToken(user.id);
        res.status(201).json({
            token,
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
            },
        });
    } catch (err) {
        // Return the error message
        res.status(400).json({
            message: "Registration failed",
            error: err.message,
        });
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username: username } });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = signToken(user.id);
        res.status(200).json({
            token,
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
            },
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error" })
    }
    
};

export const getProfile = async (req, res) => {
    if (!req.user) {
        return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(req.user);
};
