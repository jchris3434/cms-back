const express = require('express');
const router = express.Router();
const {getAllUsers, getUserById, createUser, updateUser, deleteUser, loginUser} = require('../controllers/users-controller');
const { authenticateRole } = require('../middleware/authentication-handler');


const requireAdmin = authenticateRole(1);
const requireClient = authenticateRole(1 || 2);


router.get('/', requireAdmin, getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.post('/login', loginUser);

module.exports = router;