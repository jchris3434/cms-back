const { suquelize, sequelize } = require("../config/database");
const { DataTypes } = require("sequelize");
const Role = require("../models/Role")(sequelize, DataTypes);
const { responseHandler } = require("../middleware/response-handler");

require("dotenv").config();


/**
 * Retrieves all users from the database.
 * @param {object} req - The request object.
 * @param {object} res - The response object used to send back the list of roles or error messages.
 */
const getAllRoles = async (req,res) => {
    try{
        const roles = await Role.findAll();
        responseHandler(roles, "List of roles successfully retrieved", 200)
      .then((result) => res.json(result))
      .catch((error) => res.status(error.status || 500).json(error));
    } catch (error) {
        responseHandler(error, "Error fetching roles", 500)
          .then((result) => res.json(result))
          .catch((error) => res.status(error.status || 400).json(error));
      }
};


/**
 * Fetches a role by their unique identifier.
 * @param {object} req - The request object, containing the role's ID in the params.
 * @param {object} res - The response object used to send back the role data or error messages.
 */
const getRoleById = async (req,res) => {
    try{
        const roleId = req.params.id;
        const role = await Role.findByPk(roleId);
        responseHandler(
            role,
            role ? "Found" : "Not found",
            role ? 200 : 404
        )
        .then((result) => res.json(result))
        .catch((error) => res.status(error.status ||500).json(error));
    } catch (error) {
        responseHandler(error, "Error fetching role", 500)
          .then((result) => res.json(result))
          .catch((error) => res.status(error.status || 400).json(error));
      }
};

/**
 * Checks if a user exists in the database by their username.
 * @param {string} usr_username - The username to check for existence.
 * @returns {Promise<boolean>} - A promise that resolves with true if the user exists, false otherwise.
 */

const checkRoleExists = async (rol_name) => {
    const role = await Role.findOne({ where: { rol_name}});
    return role;
}

/**
 * Create a new role with the provided details.
 * @param {object} req - The request object containing role data in the body.
 * @param {object} res - The response object used to send back the created role data or error messages.
 */

const createRole = async (req,res) => {
    try{
        const roleExists = await checkRoleExists(req.body.rol_name);
        if (roleExists) {
            return responseHandler({}, "Role already exists", 400)
            .then((result) => res.json(result))
            .catch((error) => res.status(error.status || 500).json(error));
        }
        const role = await Role.create(req.body);
        responseHandler(role, "Role successfully created", 200)
      .then((result) => res.json(result))
      .catch((error) => {
        const statusCode = error.status || 500;
        res.status(statusCode).json(error);
      });
    } catch (error) {
        responseHandler(error, "Error creating role", 500)
          .then((result) => res.json(result))
          .catch((error) => {
            const statusCode = error.status || 400;
            res.status(statusCode).json(error);
          });
      }
};

/**
 * Updates an existing user's details except for their username.
 * @param {object} req - The request object, containing the user's ID in the params and update details in the body.
 * @param {object} res - The response object used to send back the updated user data or error messages.
 */

const updateRole = async (req,res) => {
    try{
        const roleId = req.params.id;
        const updates = req.body;
        const role = await Role.findByPk(roleId);
        if (!role) {
            return responseHandler(null, "Role not found", 404)
            .then ((result) => res.json(result))
            .catch((error) => res.status(error.status || 500).json(error));
        }
        const updatedRole = await role.update(updates);
        responseHandler(updatedRole, "Role updated successfully", 200)
            .then((result) => res.json(result))
            .catch((error) => res.status(error.status || 500).json(error))
    } catch (error) {
    responseHandler(error, "Error updating role", 500)
      .then((result) => res.json(result))
      .catch((error) => res.status(error.status || 400).json(error));
  }
};

/**
 * Deletes a user from the database based on their unique identifier.
 * @param {object} req - The request object, containing the user's ID in the params.
 * @param {object} res - The response object used to confirm deletion or send back error messages.
 */
const deleteRole = async (req,res) => {
    try{
        const roleId = req.params.id;
        const role = await Role.findByPk(roleId);
        if (!role) {
            return responseHandler(null, "Role not found", 404)
            .then((result) => res.json(result))
            .catch((error) => res.status(error.status || 500).json(error));
        }
        await role.destroy();
        responseHandler({}, "Role successfully deleted", 200)
            .then((result) => res.json(result))
            .catch((error) => res.status(error.status || 500).json(error))
    } catch(error) {
        responseHandler(error, "Error deleting role", 500)
        .then((result) => res.json(result))
        .catch((error) => res.status(error.status || 400).json(error))
    }
}



module.exports = {
    getAllRoles,
    getRoleById,
    createRole,
    updateRole,
    deleteRole
};