const { sequelize } = require("../config/database");
const { DataTypes } = require("sequelize");
const Component = require("../models/Component.js")(sequelize, DataTypes);
const { responseHandler } = require("../middleware/response-handler");

/**
 * Create a new component with the provided details.
 * @param {object} req - The request object containing component data in the body.
 * @param {object} res - The response object used to send back the created component data or error messages.
 */
const createComponent = async (req, res) => {
    try {
        const component = await Component.create(req.body);
        responseHandler(component, "Component successfully created")
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
 * Fetches a component by its unique identifier.
 * @param {object} req - The request object, containing the component's ID in the params.
 * @param {object} res - The response object used to send back the component data or error messages.
 */ 
const getComponentById = async (req, res) => {
    try {
        const componentId = req.params.id;
        const component = await Component.findByPk(componentId);
        responseHandler(component, "Component found")
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
 * Fetches all components from the database.
 * @param {object} req - The request object.
 * @param {object} res - The response object used to send back the component data or error messages.
 */
const getAllComponents = async (req, res) => {
    try {
        const components = await Component.findAll();
        responseHandler(components, "Components found")
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
 * Updates an existing component's details.
 * @param {object} req - The request object, containing the component's ID in the params and update details in the body.
 * @param {object} res - The response object used to send back the updated component data or error messages.
 */
const updateComponent = async (req, res) => {
    try {
        const componentId = req.params.id;
        const updates = req.body;
        const component = await Component.findByPk(componentId);
        if (!component) {
            return responseHandler(null, "Component not found", 404)
            .then((result) => res.json(result))
            .catch((error) => {
                const statusCode = error.status || 500;
                res.status(statusCode).json(error);
            });
        }
        await component.update(updates);
        responseHandler(component, "Component successfully updated")
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
 * Deletes an existing component from the database.
 * @param {object} req - The request object, containing the component's ID in the params.
 * @param {object} res - The response object used to send back the success message or error messages.
 */
const deleteComponent = async (req, res) => {
    try {
        const componentId = req.params.id;
        const component = await Component.findByPk(componentId);
        if (!component) {
            return responseHandler(null, "Component not found", 404)
            .then((result) => res.json(result))
            .catch((error) => {
                const statusCode = error.status || 500;
                res.status(statusCode).json(error);
            });
        }
        await component.destroy();
        responseHandler({}, "Component successfully deleted")
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
    createComponent,
    getComponentById,
    getAllComponents,
    updateComponent,
    deleteComponent,
};