const { User } = require('../models');
const { Op } = require('sequelize');

const getAllUsers = async () => {
  return User.findAll({ order: [['createdAt', 'DESC']] });
};

const getUserById = async (id) => {
  return User.findByPk(id);
};

const createUser = async (payload) => {
  return User.create(payload);
};

const updateUser = async (id, payload) => {
  const user = await User.findByPk(id);
  if (!user) return null;

  await user.update(payload);
  return user;
};

const deleteUser = async (id) => {
  const user = await User.findByPk(id);
  if (!user) return null;

  await user.destroy();
  return true;
};

const findUserByEmail = async (email) => {
  return User.findOne({ where: { email: { [Op.iLike]: email } } });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  findUserByEmail,
};
