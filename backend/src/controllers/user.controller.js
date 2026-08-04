const userService = require('../services/user.service');
const { User } = require('../models');

const getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    return res.status(200).json({ success: true, data: users });
  } catch (error) {
    return next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        errors: [{ message: 'No user found with the given id' }],
      });
    }

    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    return next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const payload = req.body;
    const existingUser = await userService.findUserByEmail(payload.email);

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Duplicate email',
        errors: [{ field: 'email', message: 'A user with this email already exists' }],
      });
    }

    const user = await userService.createUser(payload);
    return res.status(201).json({ success: true, message: 'User created successfully', data: user });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({
        success: false,
        message: 'Duplicate email',
        errors: [{ field: 'email', message: 'A user with this email already exists' }],
      });
    }

    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: error.errors.map((err) => ({ field: err.path, message: err.message })),
      });
    }

    return next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const payload = req.body;
    const existingUser = await userService.findUserByEmail(payload.email);

    if (existingUser && existingUser.id !== req.params.id) {
      return res.status(400).json({
        success: false,
        message: 'Duplicate email',
        errors: [{ field: 'email', message: 'A user with this email already exists' }],
      });
    }

    const user = await userService.updateUser(req.params.id, payload);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        errors: [{ message: 'No user found with the given id' }],
      });
    }

    return res.status(200).json({ success: true, message: 'User updated successfully', data: user });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({
        success: false,
        message: 'Duplicate email',
        errors: [{ field: 'email', message: 'A user with this email already exists' }],
      });
    }

    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: error.errors.map((err) => ({ field: err.path, message: err.message })),
      });
    }

    return next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const deleted = await userService.deleteUser(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        errors: [{ message: 'No user found with the given id' }],
      });
    }

    return res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
