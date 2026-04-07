/**
 * Seeder: 03-seed-comments
 *
 * Inserts sample comments.
 * Each user comments on their own and others' posts.
 */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Check if comments already exist
    const existingComments = await queryInterface.sequelize.query(
      `SELECT id FROM "comments" LIMIT 1;`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (existingComments.length > 0) {
      console.log("Comments already exist, skipping seed");
      return;
    }

    // Users
    const userA = "b6606e72-d22b-406c-bc3a-96fa13556362"; // Jane Doe
    const userB = "a5506e72-d22b-406c-bc3a-96fa13556361"; // John Smith

    // Posts
    const posts = [
      // Jane's posts
      "b6605672-d22b-406c-bc3a-96fa13556362",
      "b6606e72-d22b-416c-bc3a-96fa13556362",

      // John Smith's posts
      "a5506e72-d22b-416c-bc3a-96fa13556361",
      "a5506e72-d22b-426c-bc3a-96fa13556361",
      "a5506e72-d22b-436c-bc3a-96fa13556361",
    ];

    const now = new Date();

    const comments = [
      // =========================
      // Jane comments
      // =========================

      // On her own posts
      {
        id: "c1006e72-d22b-406c-bc3a-96fa13556361",
        comment: "Really enjoyed writing this one. Curious what others think!",
        commenter: userA,
        post: posts[0],
        createdAt: now,
        updatedAt: now,
      },
      {
        id: "c1006e72-d22b-406c-bc3a-96fa13556362",
        comment: "This topic is something I’ve been exploring a lot lately.",
        commenter: userA,
        post: posts[1],
        createdAt: now,
        updatedAt: now,
      },

      // On John Smith's posts
      {
        id: "c1006e72-d22b-406c-bc3a-96fa13556363",
        comment: "Great breakdown, this was super easy to follow.",
        commenter: userA,
        post: posts[2],
        createdAt: now,
        updatedAt: now,
      },
      {
        id: "c1006e72-d22b-406c-bc3a-96fa13556364",
        comment: "I like this perspective — especially the part about balance.",
        commenter: userA,
        post: posts[3],
        createdAt: now,
        updatedAt: now,
      },

      // =========================
      // John Smith comments
      // =========================

      // On his own posts
      {
        id: "c2006e72-d22b-406c-bc3a-96fa13556361",
        comment: "This is something I wish I knew earlier!",
        commenter: userB,
        post: posts[2],
        createdAt: now,
        updatedAt: now,
      },
      {
        id: "c2006e72-d22b-406c-bc3a-96fa13556362",
        comment: "Still learning, but this has helped me a lot.",
        commenter: userB,
        post: posts[3],
        createdAt: now,
        updatedAt: now,
      },
      {
        id: "c2006e72-d22b-406c-bc3a-96fa13556363",
        comment: "Databases used to confuse me, but it's clearer now.",
        commenter: userB,
        post: posts[4],
        createdAt: now,
        updatedAt: now,
      },

      // On Jane's posts
      {
        id: "c2006e72-d22b-406c-bc3a-96fa13556364",
        comment: "Interesting take — I hadn’t thought about it that way.",
        commenter: userB,
        post: posts[0],
        createdAt: now,
        updatedAt: now,
      },
      {
        id: "c2006e72-d22b-406c-bc3a-96fa13556365",
        comment: "This was a really engaging read, nice work!",
        commenter: userB,
        post: posts[1],
        createdAt: now,
        updatedAt: now,
      },
    ];

    await queryInterface.bulkInsert("comments", comments, {});
    console.log("Comments seeded successfully");
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete("comments", null, {});
  },
};