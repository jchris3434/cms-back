const { sequelize } = require('../config/database');
const { DataTypes } = require('sequelize');
const User = require('../models/User.js')(sequelize, DataTypes);
const { responseHandler } = require('../middleware/response-handler');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;


const createUser = async (req, res) => {
  try {
    // Directly use req.body for creating a new user.
    const user = await User.create(req.body);
    responseHandler(user, "User successfully created")
      .then(result => res.json(result))
      .catch(error => {
        const statusCode = error.status || 500;
        res.status(statusCode).json(error);
      });
  } catch (error) {
    responseHandler(error)
      .then(result => res.json(result))
      .catch(error => {
        const statusCode = error.status || 400;
        res.status(statusCode).json(error);
      });
  }
};


const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);
    responseHandler(user, user ? "User found" : "User not found", user ? 200 : 404)
      .then(result => res.json(result))
      .catch(error => res.status(error.status || 500).json(error));
  } catch (error) {
    responseHandler(error, "Error fetching user", 500)
      .then(result => res.json(result))
      .catch(error => res.status(error.status || 500).json(error));
  }
};


const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    responseHandler(users, "List of users successfully retrieved", 200)
      .then(result => res.json(result))
      .catch(error => res.status(error.status || 500).json(error));
  } catch (error) {
    responseHandler(error, "Error fetching users", 500)
      .then(result => res.json(result))
      .catch(error => res.status(error.status || 500).json(error));
  }
};


const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updates = req.body;
    const user = await User.findByPk(userId);
    if (!user) {
      return responseHandler(null, "User not found", 404)
        .then(result => res.json(result))
        .catch(error => res.status(error.status || 500).json(error));
    }
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, SALT_ROUNDS);
    }
    const updatedUser = await user.update(updates);
    responseHandler(updatedUser, "User updated successfully", 200)
      .then(result => res.json(result))
      .catch(error => res.status(error.status || 500).json(error));
  } catch (error) {
    responseHandler(error, "Error updating user", 500)
      .then(result => res.json(result))
      .catch(error => res.status(error.status || 500).json(error));
  }
};


const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);
    if (!user) {
      return responseHandler(null, "User not found", 404)
        .then(result => res.json(result))
        .catch(error => res.status(error.status || 500).json(error));
    }
    await user.destroy();
    responseHandler({}, "User successfully deleted", 200)
      .then(result => res.json(result))
      .catch(error => res.status(error.status || 500).json(error));
  } catch (error) {
    responseHandler(error, "Error deleting user", 500)
      .then(result => res.json(result))
      .catch(error => res.status(error.status || 500).json(error));
  }
};


/**
 * Attempt to log a user in with their credentials
 * @param {string} username - The user's email
 * @param {string} password - The user's password
 * @returns {Promise<string>} - A promise that resolves with the JWT if login is successful
 */
const loginUser = async (username, password) => {
    try {
      const user = await User.findOne({ where: { username } });
      if (!user) {
        throw new Error('User not found');
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        throw new Error('Password is incorrect');
      }
      const token = jwt.sign({ userId: user.id }, JWT_KEY);
      return token;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

module.exports = {
   createUser,
   getUserById,
   getAllUsers,
   updateUser,
   deleteUser,
   loginUser
};





