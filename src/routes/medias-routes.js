const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer'); // Assure-toi que le chemin est correct
const { getAllMedia, getMediaById, createMedia, updateMedia, deleteMedia } = require('../controllers/medias-controller');

// Route pour obtenir tous les médias
router.get('/', getAllMedia);

// Route pour obtenir un média par son ID
router.get('/:id', getMediaById);

// Route pour créer un média (avec gestion des fichiers)
router.post('/', upload.single('file'), createMedia); // Utilisation de multer pour gérer l'upload de fichiers

// Route pour mettre à jour un média
router.put('/:id', updateMedia);

// Route pour supprimer un média
router.delete('/:id', deleteMedia);

module.exports = router;
