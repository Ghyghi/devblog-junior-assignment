import { DataTypes } from "sequelize";
import { sequelize } from "../utils/db.js";
import bcrypt from "bcryptjs";

/**
 * User model
 *
 * Represents application users. Passwords are hashed with bcrypt in
 * a beforeSave hook. Exposes an instance method `comparePassword`
 * for verifying plain-text passwords.
 */
const User = sequelize.define(
    "User",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: { notEmpty: true },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: { isEmail: true, notEmpty: true },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notEmpty: true },
        },
    },
    { tableName: "users", timestamps: true },
);

User.beforeSave(async (user) => {
    if (user.changed("password")) {
        user.password = await bcrypt.hash(user.password, 12);
    }
});

User.prototype.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

export { User };
