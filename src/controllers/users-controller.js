const jwt = require('jsonwebtoken');
const { User } = require('./models/User');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

const createUser = async (userData) => {
  const hashedPassword = await bcrypt.hash(userData.password, SALT_ROUNDS);
  try {
    const user = await User.create(userData);
    return user;
  } catch (error) {
    console.error('Error creating user:', error);
  }
};

const getUserById = async (userId) => {
  try {
    const user = await User.findByPk(userId);
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
  }
};

const getAllUsers = async () => {
  try {
    const users = await User.findAll();
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

const updateUser = async (userId, updates) => {
  try {
    const user = await User.findByPk(userId);
    if (user) {
      if (updates.password) {
        updates.password = await bcrypt.hash(updates.password, SALT_ROUNDS);
      }
      const updatedUser = await user.update(updates);
      return updatedUser;
    } else {
      console.log('User not found');
    }
  } catch (error) {
    console.error('Error updating user:', error);
  }
};

const deleteUser = async (userId) => {
  try {
    const user = await User.findByPk(userId);
    if (user) {
      await user.destroy();
      console.log('User successfully deleted');
    } else {
      console.log('User not found');
    }
  } catch (error) {
    console.error('Error deleting user:', error);
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





