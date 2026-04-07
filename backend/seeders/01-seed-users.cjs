/**
 * Seeder: 01-seed-users
 *
 * Inserts three sample users with pre-hashed passwords.
 * Intended for development and testing.
 */
const bcrypt = require("bcryptjs");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        // Check if users already exist
        const existingUsers = await queryInterface.sequelize.query(
            `SELECT id FROM "users" LIMIT 1;`,
            { type: Sequelize.QueryTypes.SELECT },
        );

        if (existingUsers.length > 0) {
            console.log("Users already exist, skipping seed");
            return;
        }

        const plainPassword = process.env.SEED_PASSWORD;
        if (!plainPassword) throw new Error("SEED_PASSWORD is not set.");

        const hashedPassword = await bcrypt.hash(plainPassword, 12);

        const users = [
            {
                id: "b6606e72-d22b-406c-bc3a-96fa13556362",
                username: "janedoe",
                email: "janedoe@email.com",
                password: hashedPassword,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: "a5506e72-d22b-406c-bc3a-96fa13556361",
                username: "johnsmith",
                email: "johnsmith@email.com",
                password: hashedPassword,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];

        await queryInterface.bulkInsert("users", users, {});
        console.log("Users seeded successfully");
    },

    down: async (queryInterface, _Sequelize) => {
        await queryInterface.bulkDelete("users", null, {});
    },
};
