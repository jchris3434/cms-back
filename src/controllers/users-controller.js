const { sequelize } = require("../config/database");
const { DataTypes } = require("sequelize");
const User = require("../models/User.js")(sequelize, DataTypes);
const { responseHandler } = require("../middleware/response-handler");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_KEY = process.env.JWT_KEY;

/**
 * Create a new user with the provided details.
 * @param {object} req - The request object containing user data in the body.
 * @param {object} res - The response object used to send back the created user data or error messages.
 */
const createUser = async (req, res) => {
  try {
    const userExists = await checkUserExists(req.body.usr_username);
    if (userExists) {
      return responseHandler({}, "User already exists", 400)
        .then((result) => res.json(result))
        .catch((error) => res.status(error.status || 500).json(error));
    }
    const user = await User.create(req.body);
    responseHandler(user, "User successfully created", 200)
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
 * Checks if a user exists in the database by their username.
 * @param {string} usr_username - The username to check for existence.
 * @returns {Promise<boolean>} - A promise that resolves with true if the user exists, false otherwise.
 */

const checkUserExists = async (usr_username) => {
  const user = await User.findOne({ where: { usr_username } });
  return user;
};


/**
 * Fetches a user by their unique identifier.
 * @param {object} req - The request object, containing the user's ID in the params.
 * @param {object} res - The response object used to send back the user data or error messages.
 */
const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);
    responseHandler(
      user,
      user ? "User found" : "User not found",
      user ? 200 : 404
    )
      .then((result) => res.json(result))
      .catch((error) => res.status(error.status || 500).json(error));
  } catch (error) {
    responseHandler(error, "Error fetching user", 500)
      .then((result) => res.json(result))
      .catch((error) => res.status(error.status || 500).json(error));
  }
};

/**
 * Retrieves all users from the database.
 * @param {object} req - The request object.
 * @param {object} res - The response object used to send back the list of users or error messages.
 */
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    responseHandler(users, "List of users successfully retrieved", 200)
      .then((result) => res.json(result))
      .catch((error) => res.status(error.status || 500).json(error));
  } catch (error) {
    responseHandler(error, "Error fetching users", 500)
      .then((result) => res.json(result))
      .catch((error) => res.status(error.status || 500).json(error));
  }
};

/**
 * Updates an existing user's details except for their username.
 * @param {object} req - The request object, containing the user's ID in the params and update details in the body.
 * @param {object} res - The response object used to send back the updated user data or error messages.
 */
const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updates = req.body;
    const user = await User.findByPk(userId);
    if (!user) {
      return responseHandler(null, "User not found", 404)
        .then((result) => res.json(result))
        .catch((error) => res.status(error.status || 500).json(error));
    }
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, SALT_ROUNDS);
    }
    const updatedUser = await user.update(updates);
    responseHandler(updatedUser, "User updated successfully", 200)
      .then((result) => res.json(result))
      .catch((error) => res.status(error.status || 500).json(error));
  } catch (error) {
    responseHandler(error, "Error updating user", 500)
      .then((result) => res.json(result))
      .catch((error) => res.status(error.status || 500).json(error));
  }
};


/**
 * Deletes a user from the database based on their unique identifier.
 * @param {object} req - The request object, containing the user's ID in the params.
 * @param {object} res - The response object used to confirm deletion or send back error messages.
 */
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);
    if (!user) {
      return responseHandler(null, "User not found", 404)
        .then((result) => res.json(result))
        .catch((error) => res.status(error.status || 500).json(error));
    }
    await user.destroy();
    responseHandler({}, "User successfully deleted", 200)
      .then((result) => res.json(result))
      .catch((error) => res.status(error.status || 500).json(error));
  } catch (error) {
    responseHandler(error, "Error deleting user", 500)
      .then((result) => res.json(result))
      .catch((error) => res.status(error.status || 500).json(error));
  }
};


/**
 * Attempt to log a user in with their credentials
 * @param {string} usr_username - The user's name
 * @param {string} usr_password - The user's password
 * @returns {Promise<string>} - A promise that resolves with the JWT if login is successful
 */
const loginUser = async (req, res) => {
  try {
    const { usr_username, usr_password } = req.body;
    const user = await User.findOne({ where: { usr_username } });
    if (!user) {
      return responseHandler(null, "User not found", 404)
        .then((result) => res.json(result))
        .catch((error) => res.status(error.status || 500).json(error));
    }
    const match = await bcrypt.compare(usr_password, user.usr_password);
    if (!match) {
      return responseHandler(null, "Oops, bad credentials", 401)
        .then((result) => res.json(result))
        .catch((error) => res.status(error.status || 500).json(error));
    }
  // Extraire le nom du rôle de l'utilisateur
  const role = await user.getRole();
  const roleName = role ? role.rol_name : null;
  console.log(roleName);

  // Créer le token JWT avec le nom du rôle dans le payload
  const token = jwt.sign({ userId: user.usr_id, roleName }, JWT_KEY);
  res.json({ token });
  const dec = jwt.decode(token);
  console.log(dec);

  } catch (error) {
    responseHandler(error, "Error trying to connect user", 500)
      .then((result) => res.json(result))
      .catch((error) => res.status(error.status || 500).json(error));
  }
};

module.exports = {
  createUser,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
  loginUser,
};
