import { Post } from "../models/postModel.js";
import { User } from "../models/userModel.js";
import { Op } from "sequelize";

/**
 * Post controller
 *
 * Provides handlers to list, fetch, create, update and delete posts. Handlers use
 * Express (req, res) parameters and consistently return JSON responses with
 * appropriate HTTP status codes.
 */


export const getAllPosts = async (req, res) => {
    try {
        const { poster, category, search, limit = 10, offset = 0 } = req.query;
        const whereClause = {};

        if (poster) {
            whereClause.poster = poster;
        }

        if (category) {
            whereClause.category = category;
        }

        if (search) {
            whereClause[Op.or] = [
                { title: { [Op.iLike]: `%${search}%` } },
                { content: { [Op.iLike]: `%${search}%` } },
            ];
        }

        const { count, rows } = await Post.findAndCountAll({
            where: whereClause,
            include: [
                {
                    model: User,
                    as: "posterDetails",
                    attributes: [
                        "id",
                        "username",
                        "email",
                    ],
                },
            ],
            limit: Number(limit),
            offset: Number(offset),
            distinct: true,
        });

        res.json({
            posts: rows,
            total: count,
            limit: Number(limit),
            offset: Number(offset),
        });
    } catch (err) {
        res.status(500).json({
            message: "Error fetching posts",
            error: err.message,
        });
    }
};

export const getPostById = async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    as: "posterDetails",
                    attributes: [
                        "id",
                        "username",
                        "email",
                    ],
                },
            ],
        });
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.json(post);
    } catch (err) {
        res.status(500).json({
            message: "Error fetching post",
            error: err.message,
        });
    }
};

export const createPost = async (req, res) => {
    try {
        const post = req.body;
        post.poster = req.user.id; // Ensure the poster is set to the authenticated user
        const createdPost = await Post.create(post);
        res.status(201).json(createdPost);
    } catch (err) {
        res.status(400).json({
            message: "Error creating post",
            error: err.message,
        });
    }
};

export const updatePost = async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    as: "posterDetails",
                    attributes: [
                        "id",
                        "username",
                        "email",
                    ],
                },
            ],
        });
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        await post.update(req.body);
        res.json(post);
    } catch (err) {
        res.status(500).json({
            message: "Error updating post",
            error: err.message,
        });
    }
};

export const deletePost = async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);
        if (!post) {
            console.log(`Post with ID ${req.params.id} not found`);
            return res.status(404).json({ message: "Post not found" });
        }
        await post.destroy();
        res.status(204).json({ message: "Post deleted" });
    } catch (err) {
        res.status(500).json({
            message: "Error deleting post",
            error: err.message,
        });
    }
};
