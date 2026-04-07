import { DataTypes } from "sequelize";
import { sequelize } from "../utils/db.js";
import { User } from "./userModel.js";
import { Post } from "./postModel.js";

/**
 * Comment model
 *
 * Represents application Comments.
 */
const Comment = sequelize.define(
    "Comment",
    {
        id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
        comment: { type: DataTypes.STRING, allowNull: false },
        commenter: {
            type: DataTypes.UUID,
            allowNull: false,
            references: { model: User, key: "id" },
            onDelete: "PROTECT",
        },
        post: {
            type: DataTypes.UUID,
            allowNull: false,
            references: { model: Post, key: "id" },
            onDelete: "PROTECT",
        },
    },
    { tableName: "comments", timestamps: true },
);

/**
 * Associations
 *
 * Each Comment belongs to a single Commenter (User).
 * A user can have many Comments.
 * 
 * Each Comment belongs to a single Post.
 * A Post can have many Comments.
 */
Comment.belongsTo(User, { foreignKey: "commenter", as: "commenterDetails" });
User.hasMany(Comment, { foreignKey: "commenter", as: "comments" });

Comment.belongsTo(Post, { foreignKey: "post", as: "postDetails" });
Post.hasMany(Comment, { foreignKey: "post", as: "comments" });

export { Comment };
