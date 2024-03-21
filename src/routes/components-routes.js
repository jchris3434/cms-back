const express = require('express');
const router = express.Router();
const {getAllComponents, getComponentById, createComponent, updateComponent, deleteComponent} = require('../controllers/components-controller');

router.get('/', getAllComponents);
router.get('/:id', getComponentById);
router.post('/', createComponent);
router.put('/:id', updateComponent);
router.delete('/:id', deleteComponent);

module.exports = router;