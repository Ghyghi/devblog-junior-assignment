import { DataTypes } from "sequelize";
import { sequelize } from "../utils/db.js";
import { User } from "./userModel.js";

/**
 * Post categories
 *
 * Centralized list for both model and validation logic.
 */
export const POST_CATEGORIES = [
    "Tech",
    "Lifestyle",
    "Travel",
    "Sports",
];

/**
 * Post model
 *
 * Represents application posts.
 */
const Post = sequelize.define(
    "Post",
    {
        id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4  },
        title: { type: DataTypes.STRING, allowNull: false },
        content: { type: DataTypes.TEXT, allowNull: false },
        category: {
            type: DataTypes.ENUM(...POST_CATEGORIES),
            allowNull: false,
        },
        poster: {
            type: DataTypes.UUID,
            allowNull: false,
            references: { model: User, key: "id" },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        },
    },
    { tableName: "posts", timestamps: true },
);

/**
 * Associations
 *
 * Each post belongs to a single poster (User).
 * A user can have many posts.
 */
Post.belongsTo(User, { foreignKey: "poster", as: "posterDetails" });
User.hasMany(Post, { foreignKey: "poster", as: "posts" });

export { Post };
