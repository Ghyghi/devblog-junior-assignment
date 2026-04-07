import fs from "fs";
import path from "path";
import { Sequelize } from "sequelize";
import { fileURLToPath } from "url";
import { sequelize } from "../utils/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const basename = path.basename(__filename);

const db = {};

// Helper function to define models (exported for potential use)
const define = (modelName, attributes, options = {}) => {
    return sequelize.define(modelName, attributes, options);
};

/**
 * Models index
 *
 * Dynamically imports all model files in this directory, registers them on
 * the `db` object, and runs any association setup. Call `initializeModels()`
 * during application startup to populate the `db` object and attach the
 * Sequelize instance.
 */
export { sequelize as default, define };

async function initializeModels() {
    const files = fs.readdirSync(__dirname).filter((file) => {
        return (
            file.indexOf(".") !== 0 &&
            file !== basename &&
            file.slice(-3) === ".js" &&
            !file.endsWith(".test.js")
        );
    });

    // Import all model files
    for (const file of files) {
        try {
            const modelModule = await import(path.join(__dirname, file));

            // Handle both named exports and default exports
            const models = modelModule.default || modelModule;

            // If it's an object with multiple named exports, add each to db
            if (typeof models === "object" && !models.name) {
                Object.keys(models).forEach((key) => {
                    if (models[key] && models[key].name) {
                        db[models[key].name] = models[key];
                    }
                });
            } else if (models && models.name) {
                // Single model export
                db[models.name] = models;
            }
        } catch (error) {
            console.error(`Error importing model from ${file}:`, error);
        }
    }

    // Setup associations if any
    for (const modelName of Object.keys(db)) {
        if (db[modelName].associate) {
            db[modelName].associate(db);
        }
    }

    db.sequelize = sequelize;
    db.Sequelize = Sequelize;

    return db;
}

// Export the initialization function
export { initializeModels };
