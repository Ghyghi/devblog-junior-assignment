import jwt from "jsonwebtoken";

/**
 * JWT helpers
 *
 * Exports signToken and verifyToken helpers. Requires the following env vars:
 * - JWT_SECRET
 * - JWT_EXPIRES_IN (used for signToken expiresIn)
 */
export function signToken(userId) {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
}

export function verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
}
