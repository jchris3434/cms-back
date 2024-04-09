<<<<<<< HEAD
const express = require('express');
const router = express.Router();
const {getAllUsers, getUserById, createUser, updateUser, deleteUser, loginUser} = require('../controllers/users-controller');

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.post('/login', loginUser);

=======
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

>>>>>>> e61df04b1c952d7b3a1d2b42c3ddd69616b32017
module.exports = router;