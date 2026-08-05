const { User } = require('../models');
const { Op } = require('sequelize');

const getAllUsers = async ({ page = 1, limit = 10, search = '' } = {}) => {
  const offset = (page - 1) * limit;

  const where = {};
  if (search && String(search).trim() !== '') {
    const term = `%${String(search).trim()}%`;
    where[Op.or] = [
      { name: { [Op.iLike]: term } },
      { email: { [Op.iLike]: term } },
      { company: { [Op.iLike]: term } },
    ];
  }

  const result = await User.findAndCountAll({
    where,
    order: [['createdAt', 'DESC']],
    limit: Number(limit),
    offset: Number(offset),
  });

  return result; // { rows, count }
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
