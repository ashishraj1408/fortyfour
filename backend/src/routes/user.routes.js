const express = require('express');
const userController = require('../controllers/user.controller');
const { userValidationRules } = require('../validations/user.validation');
const validateRequest = require('../middleware/validateRequest');

const router = express.Router();

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userValidationRules, validateRequest, userController.createUser);
router.put('/:id', userValidationRules, validateRequest, userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
