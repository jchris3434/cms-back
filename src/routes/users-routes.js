const express = require('express');
const router = express.Router();
const {getAllUsers, getUserById, createUser, updateUser, deleteUser, loginUser} = require('../controllers/users-controller');
const { authenticateRole } = require('../middleware/authentication-handler');



router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.post('/login', loginUser);

module.exports = router;