const express = require('express');
const router = express.Router();
const {getAllContents, getContentById, createContent, updateContent, deleteContent} = require('../controllers/contents-controller');

router.get('/', getAllContents);
router.get('/:id', getContentById);
router.post('/', createContent);
router.put('/:id', updateContent);
router.delete('/:id', deleteContent);

module.exports = router;