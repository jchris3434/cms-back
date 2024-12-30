const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads')); // repertory for uploaded files
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.replace(/\s+/g, '-'); // renaming without spaces
        cb(null, fileName);
    }
});

// Creation of Multer instance
const upload = multer({ storage: storage });

module.exports = upload;
