const { sequelize } = require("../config/database");
const { DataTypes } = require("sequelize");
const Content = require("../models/Content.js")(sequelize, DataTypes);
const { responseHandler } = require("../middleware/response-handler");

/**
 * Create a new content with the provided details.
 * @param {object} req - The request object containing content data in the body.
 * @param {object} res - The response object used to send back the created content data or error messages.
 */
const createContent = async (req, res) => {
  try {
    const content = await Content.create(req.body);
    responseHandler(content, "Content successfully created")
      .then((result) => res.json(result))
      .catch((error) => {
        const statusCode = error.status || 500;
        res.status(statusCode).json(error);
      });
  } catch (error) {
    responseHandler(error)
      .then((result) => res.json(result))
      .catch((error) => {
        const statusCode = error.status || 400;
        res.status(statusCode).json(error);
      });
  }
};

/**
 * Fetches a content by its unique identifier.
 * @param {object} req - The request object, containing the content's ID in the params.
 * @param {object} res - The response object used to send back the content data or error messages.
 */
const getContentById = async (req, res) => {
  try {
    const contentId = req.params.id;
    const content = await Content.findByPk(contentId);
    responseHandler(content, "Content found")
      .then((result) => res.json(result))
      .catch((error) => {
        const statusCode = error.status || 500;
        res.status(statusCode).json(error);
      });
  } catch (error) {
    responseHandler(error)
      .then((result) => res.json(result))
      .catch((error) => {
        const statusCode = error.status || 400;
        res.status(statusCode).json(error);
      });
  }
};

/**
 * Fetches all contents from the database.
 * @param {object} req - The request object.
 * @param {object} res - The response object used to send back the content data or error messages.
 */
const getAllContents = async (req, res) => {
  try {
    const contents = await Content.findAll();
    responseHandler(contents, "Contents found")
      .then((result) => res.json(result))
      .catch((error) => {
        const statusCode = error.status || 500;
        res.status(statusCode).json(error);
      });
  } catch (error) {
    responseHandler(error)
      .then((result) => res.json(result))
      .catch((error) => {
        const statusCode = error.status || 400;
        res.status(statusCode).json(error);
      });
  }
};

/**
 * Updates an existing content's details.
 * @param {object} req - The request object, containing the content's ID in the params and update details in the body.
 * @param {object} res - The response object used to send back the updated content data or error messages.
 */
const updateContent = async (req, res) => {
  try {
    const contentId = req.params.id;
    const updates = req.body;
    const content = await Content.findByPk(contentId);
    if (!content) {
      return responseHandler(null, "Content not found", 404)
        .then((result) => res.json(result))
        .catch((error) => {
          const statusCode = error.status || 500;
          res.status(statusCode).json(error);
        });
    }
    await content.update(updates);
    responseHandler(content, "Content successfully updated")
      .then((result) => res.json(result))
      .catch((error) => {
        const statusCode = error.status || 500;
        res.status(statusCode).json(error);
      });
  } catch (error) {
    responseHandler(error)
      .then((result) => res.json(result))
      .catch((error) => {
        const statusCode = error.status || 400;
        res.status(statusCode).json(error);
      });
  }
};

/**
 * Deletes a content from the database.
 * @param {object} req - The request object, containing the content's ID in the params.
 * @param {object} res - The response object used to send back the success message or error messages.
 */
const deleteContent = async (req, res) => {
  try {
    const contentId = req.params.id;
    const content = await Content.findByPk(contentId);
    if (!content) {
      return responseHandler(null, "Content not found", 404)
        .then((result) => res.json(result))
        .catch((error) => {
          const statusCode = error.status || 500;
          res.status(statusCode).json(error);
        });
    }
    await content.destroy();
    responseHandler({}, "Content successfully deleted")
      .then((result) => res.json(result))
      .catch((error) => {
        const statusCode = error.status || 500;
        res.status(statusCode).json(error);
      });
  } catch (error) {
    responseHandler(error)
      .then((result) => res.json(result))
      .catch((error) => {
        const statusCode = error.status || 400;
        res.status(statusCode).json(error);
      });
  }
};

module.exports = {
  createContent,
  getContentById,
  getAllContents,
  updateContent,
  deleteContent,
};
