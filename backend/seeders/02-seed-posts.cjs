/**
 * Seeder: 02-seed-posts
 *
 * Inserts sample posts.
 * Intended for development and testing.
 */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Check if posts already exist
    const existingPosts = await queryInterface.sequelize.query(
      `SELECT id FROM "posts" LIMIT 1;`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (existingPosts.length > 0) {
      console.log("Posts already exist, skipping seed");
      return;
    }

    const userIds = [
      "b6606e72-d22b-406c-bc3a-96fa13556362", // Jane Doe
      "a5506e72-d22b-406c-bc3a-96fa13556361", // John Smith
    ];

    const posts = [
      // Jane Doe's posts
      {
        id: "b6605672-d22b-406c-bc3a-96fa13556362",
        title: "Fugiat in ipsum nostrud est amet aliquip.",
        content:
          "Sint aute duis culpa quis est. Labore dolor Lorem minim occaecat Lorem tempor. Nisi consequat Lorem consequat minim do fugiat nulla sint cupidatat consequat sit et nisi sit.",
        category: "Tech",
        poster: userIds[0],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "b6606e72-d22b-416c-bc3a-96fa13556362",
        title:
          "Aute consectetur nisi consequat minim pariatur nisi officia ex excepteur anim irure sit.",
        content:
          "Commodo consectetur cillum consequat id nisi culpa aliquip. Sit ullamco culpa adipisicing anim ut ullamco.",
        category: "Lifestyle",
        poster: userIds[0],
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // John Smith's posts
      {
        id: "a5506e72-d22b-416c-bc3a-96fa13556361",
        title: "Getting started with modern web development",
        content:
          "Web development has evolved rapidly over the past decade. From simple static pages to dynamic full-stack applications, developers now have powerful tools at their disposal.",
        category: "Tech",
        poster: userIds[1],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "a5506e72-d22b-426c-bc3a-96fa13556361",
        title: "Balancing productivity and rest in a busy world",
        content:
          "In today's fast-paced environment, it's easy to prioritize productivity over well-being. However, sustainable success requires a balance between focused work and meaningful rest.",
        category: "Lifestyle",
        poster: userIds[1],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "a5506e72-d22b-436c-bc3a-96fa13556361",
        title: "Why learning databases is essential for developers",
        content:
          "Understanding databases is a core skill for any developer. Whether you're working with SQL or NoSQL systems, data modeling and querying are fundamental to building scalable applications.",
        category: "Tech",
        poster: userIds[1],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("posts", posts, {});
    console.log("Posts seeded successfully");
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete("posts", null, {});
  },
};