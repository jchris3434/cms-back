const { sequelize } = require("../config/database");
const { DataTypes } = require("sequelize");
const Access = require("../models/Access.js")(sequelize, DataTypes);
const { responseHandler } = require("../middleware/response-handler");

/**
 * Create a new access with the provided details.
 * @param {object} req - The request object containing access data in the body.
 * @param {object} res - The response object used to send back the created access data or error messages.
 */
const createAccess = async (req, res) => {
    try {
        const access = await Access.create(req.body);
        responseHandler(access, "Access successfully created")
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
 * Fetches an access by its unique identifier.
 * @param {object} req - The request object, containing the access's ID in the params.
 * @param {object} res - The response object used to send back the access data or error messages.
 */
const getAccessById = async (req, res) => {
    try {
        const accessId = req.params.id;
        const access = await Access.findByPk(accessId);
        responseHandler(access, "Access found")
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
 * Fetches all accesses from the database.
 * @param {object} req - The request object.
 * @param {object} res - The response object used to send back the access data or error messages.
 */
const getAllAccesses = async (req, res) => {
    try {
        const accesses = await Access.findAll();
        responseHandler(accesses, "Accesses found")
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
 * Updates an existing access's details.
 * @param {object} req - The request object, containing the access's ID in the params and update details in the body.
 * @param {object} res - The response object used to send back the updated access data or error messages.
 */
const updateAccess = async (req, res) => {
    try {
        const accessId = req.params.id;
        const updates = req.body;
        const access = await Access.findByPk(accessId);
        if (!access) {
            return responseHandler(null, "Access not found", 404)
            .then((result) => res.json(result))
            .catch((error) => {
                const statusCode = error.status || 500;
                res.status(statusCode).json(error);
            });
        }
        await access.update(updates);
        responseHandler(access, "Access successfully updated")
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
 * Deletes an access from the database.
 * @param {object} req - The request object, containing the access's ID in the params.
 * @param {object} res - The response object used to send back the success message or error messages.
 */
const deleteAccess = async (req, res) => {
    try {
        const accessId = req.params.id;
        const access = await Access.findByPk(accessId);
        if (!access) {
            return responseHandler(null, "Access not found", 404)
            .then((result) => res.json(result))
            .catch((error) => {
                const statusCode = error.status || 500;
                res.status(statusCode).json(error);
            });
        }
        await access.destroy();
        responseHandler({}, "Access successfully deleted")
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
    createAccess,
    getAccessById,
    getAllAccesses,
    updateAccess,
    deleteAccess,
};


