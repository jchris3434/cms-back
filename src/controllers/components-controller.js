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
        const componentExists = await checkComponentExists(req.body.cpn_name);
    if (componentExists) {
      return responseHandler({}, "Component already exists", 400)
        .then((result) => res.json(result))
        .catch((error) => res.status(error.status || 500).json(error));
    }
        const component = await Component.create(req.body);
        responseHandler(component, "Component successfully created", 200)
        .then((result) => res.json(result))
        .catch((error) => {
            const statusCode = error.status || 500;
            res.status(statusCode).json(error);
        });
    } catch (error) {
        responseHandler(error, "Error creating component", 500)
        .then((result) => res.json(result))
        .catch((error) => {
            const statusCode = error.status || 400;
            res.status(statusCode).json(error);
        });
    }
};

/**
 * Checks if a component exists in the database by their cpn_name.
 * @param {string} cpn_name - The cpn_name to check for existence.
 * @returns {Promise<boolean>} - A promise that resolves with true if the component exists, false otherwise.
 */

const checkComponentExists = async (cpn_name) => {
    const component = await Component.findOne({ where: { cpn_name } });
    return component;
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
        responseHandler(
            component,
            component ? "Component found" : "Component not found",
            component ? 200 : 404
          )
        .then((result) => res.json(result))
        .catch((error) => {
            const statusCode = error.status || 500;
            res.status(statusCode).json(error);
        });
    } catch (error) {
        responseHandler(error, "Error fetching component", 500)
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
        responseHandler(components, "Components found", 200)
        .then((result) => res.json(result))
        .catch((error) => {
            const statusCode = error.status || 500;
            res.status(statusCode).json(error);
        });
    } catch (error) {
        responseHandler(error, "Error fetching components", 500)
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
        responseHandler(component, "Component successfully updated", 200)
        .then((result) => res.json(result))
        .catch((error) => {
            const statusCode = error.status || 500;
            res.status(statusCode).json(error);
        });
    } catch (error) {
        responseHandler(error, "Error updating component", 500)
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
        responseHandler({}, "Component successfully deleted", 200)
        .then((result) => res.json(result))
        .catch((error) => {
            const statusCode = error.status || 500;
            res.status(statusCode).json(error);
        });
    } catch (error) {
        responseHandler(error, "Error deleting component", 500)
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