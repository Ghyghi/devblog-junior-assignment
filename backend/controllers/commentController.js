import { Comment } from "../models/commentModel.js";
import { Post } from "../models/postModel.js";
import { User } from '../models/userModel.js'

export const getAllComments = async (req, res) => {
    try {
        const {
            limit = 10,
            offset = 0,
            post,
        } = req.query;

        // Build dynamic where clause for Comment filters
        const whereClause = {};

        if (post) {
            whereClause.post = post
        }

        // Query with pagination + filtering + seller scoping
        const { count, rows } = await Comment.findAndCountAll({
            where: whereClause,
            include: [
                {
                    model: Post,
                    as: "postDetails",
                },
                {
                    model: User,
                    as: "commenterDetails",
                },
            ],
            limit: Math.min(Number(limit), 100),
            offset: Number(offset),
            distinct: true,
            order: [["createdAt", "DESC"]],
        });

        res.status(200).json({
            comments: rows,
            total: count,
            limit: Number(limit),
            offset: Number(offset),
        });
    } catch (error) {
        console.error("Error fetching comments:", error);
        res.status(500).json({
            message: "Failed to fetch comments",
            error: error.message,
        });
    }
};

export const createComment = async (req, res) => {
    try {
        const { comment, post } = req.body;

        // Ensure post exists
        const existingPost = await Post.findByPk(post);
        if (!existingPost)
            return res.status(400).json({ message: "Invalid postId" });

        const com = await Comment.create({
            comment,
            post,
            commenter: req.user.id,
        });
        res.status(201).json(com);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create comment", error });
    }
};

export const updateComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { comment } = req.body;

        const updatedComment = await Comment.findByPk(id);
        if (!updatedComment)
            return res.status(404).json({ message: "Comment not found" });
        if (updatedComment.commenter !== req.user.id)
            return res.status(403).json({ message: "You can't update this" });

        if (comment !== undefined) updatedComment.comment = comment;

        await updatedComment.save();
        res.status(200).json(updatedComment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to update comment", error });
    }
};

export const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await Comment.findByPk(id);
        if (!comment)
            return res.status(404).json({ message: "Comment not found" });
        if (comment.commenter !== req.user.id)
            return res.status(403).json({ message: "You can't delete this" });
        await comment.destroy();
        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to delete comment", error });
    }
};
