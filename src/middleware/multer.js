// Importation de multer
const multer = require('multer');
const path = require('path');

// Configuration du stockage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads')); // Répertoire de destination
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.replace(/\s+/g, '-'); // Normalisation du nom de fichier
        cb(null, fileName);
    }
});

// Création de l'instance multer
const upload = multer({ storage: storage });

// Exportation de l'instance multer
module.exports = upload;
