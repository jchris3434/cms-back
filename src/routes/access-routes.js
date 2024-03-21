const express = require('express');
const router = express.Router();
const {getAllAccesses, getAccessById, createAccess, updateAccess, deleteAccess} = require('../controllers/access-controller');

router.get('/', getAllAccesses);
router.get('/:id', getAccessById);
router.post('/', createAccess);
router.put('/:id', updateAccess);
router.delete('/:id', deleteAccess);

module.exports = router;