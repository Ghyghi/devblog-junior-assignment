"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("posts", {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
                allowNull: false,
            },            title: { type: Sequelize.STRING, allowNull: false },
            content: { type: Sequelize.TEXT, allowNull: false },
            category: {
                type: Sequelize.ENUM(
                    "Tech",
                    "Lifestyle",
                    "Travel",
                    "Sports",
                ),
                allowNull: false,
            },
            poster: {
                type: Sequelize.UUID,
                allowNull: false,
                references: { model: "users", key: "id" },
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

        // Add index on poster for faster queries
        await queryInterface.addIndex("posts", ["poster"], {
            name: "posts_poster_index",
        });

        // Add index on category for filtering
        await queryInterface.addIndex("posts", ["category"], {
            name: "posts_category_index",
        });
    },

    // eslint-disable-next-line no-unused-vars
    async down(queryInterface, Sequelize) {
        // Remove indexes first
        await queryInterface.removeIndex("posts", "posts_category_index");
        await queryInterface.removeIndex("posts", "posts_poster_index");

        // Drop the table
        await queryInterface.dropTable("posts");
    },
};
