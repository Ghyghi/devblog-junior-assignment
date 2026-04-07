"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("comments", {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
                allowNull: false,
            },
            comment: { type: Sequelize.TEXT, allowNull: false },
            commenter: {
                type: Sequelize.UUID,
                allowNull: false,
                references: { model: "users", key: "id" },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            post: {
                type: Sequelize.UUID,
                allowNull: false,
                references: { model: "posts", key: "id" },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
        });

        // Add index on commenter for faster queries
        await queryInterface.addIndex("comments", ["commenter"], {
            name: "comments_commenter_index",
        });

        // Add index on post for filtering
        await queryInterface.addIndex("comments", ["post"], {
            name: "comments_post_index",
        });
    },

    // eslint-disable-next-line no-unused-vars
    async down(queryInterface, Sequelize) {
        // Remove indexes first
        await queryInterface.removeIndex("comments", "comments_post_index");
        await queryInterface.removeIndex("comments", "comments_commenter_index");

        // Drop the table
        await queryInterface.dropTable("comments");
    },
};
