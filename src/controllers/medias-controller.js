const { sequelize } = require("../config/database");
const { DataTypes } = require("sequelize");
const fs = require('fs');
const path = require('path');
const Media = require('../models/Media')(sequelize, DataTypes);
const { responseHandler } = require("../middleware/response-handler");

/**
 * Fetches all media files.
 * @param {object} req - The request object.
 * @param {object} res - The response object used to send back the media files or error messages.
 */
async function getAllMedia(req, res) {
  try {
    // Fetching all media files from the database
    const files = await Media.findAll();
    
    // Sending back the fetched media files
    responseHandler(files, "List of media files successfully retrieved", 200)
      .then((result) => res.json(result))
      .catch((error) => res.status(error.status || 500).json(error));
  } catch (error) {
    // Handling errors
    responseHandler(error, "Error fetching all media files", 500)
      .then((result) => res.json(result))
      .catch((error) => res.status(error.status || 500).json(error));
  }
}

/**
 * Fetches a Media by its unique identifier.
 * @param {object} req - The request object, containing the Media ID in the params.
 * @param {object} res - The response object used to send back the Media data or error messages.
 */
async function getMediaById(req, res) {
  try {
    // Finding the media by its ID
    const media = await Media.findByPk(req.params.id);
    
    // If media is not found, return a 404 error
    if (!media) {
      return responseHandler(null, "Media not found", 404)
        .then((result) => res.json(result))
        .catch((error) => res.status(error.status || 500).json(error));
    }
    
    // Sending back the fetched media data
    responseHandler(media, "Media found", 200)
      .then((result) => res.json(result))
      .catch((error) => res.status(error.status || 500).json(error));
  } catch (error) {
    // Handling errors
    responseHandler(error, "Error fetching media file by ID", 500)
      .then((result) => res.json(result))
      .catch((error) => res.status(error.status || 500).json(error));
  }
}

/**
 * Create a new media with the provided details.
 * @param {object} req - The request object containing media data in the body.
 * @param {object} res - The response object used to send back the created media data or error messages.
 */
async function createMedia(req, res) {
  try {
    // Extracting file information from the request body
    const { name, alt, file } = req.body;

    // Exemple de traitement du fichier : enregistrement sur le disque
    const fileName = name.replace(/\s+/g, '-') + path.extname(file.originalname);
    const filePath = path.join(__dirname, '../uploads', fileName);
    await fs.promises.writeFile(filePath, file.buffer);

    // Creating a new media entry in the database
    const media = await Media.create({
      med_name: name,
      med_alt: alt, // Ajout du champ med_alt
      med_type: file.type, // Utilisation de file.type au lieu de file.mimetype
      med_path: filePath,
      fk_prj_id: req.body.projectId 
    });
    
    // Sending back the created media data
    responseHandler(media, "Media file successfully created", 200)
      .then((result) => res.json(result))
      .catch((error) => res.status(error.status || 500).json(error));
  } catch (error) {
    // Handling errors
    responseHandler(error, "Error creating media file", 500)
      .then((result) => res.json(result))
      .catch((error) => res.status(error.status || 500).json(error));
  }
}


/**
 * Updates a media file.
 * @param {object} req - The request object containing the media file data in the body.
 * @param {object} res - The response object used to send back the updated media file data or error messages.
 */
async function updateMedia(req, res) {
  try {
    // Extracting file information from the request
    const { name, alt } = req.body;

    // Finding the media by its ID
    const media = await Media.findByPk(req.params.id);
    
    // If media is not found, return a 404 error
    if (!media) {
      return responseHandler(null, "Media file not found", 404)
        .then((result) => res.json(result))
        .catch((error) => res.status(error.status || 500).json(error));
    }
    
    // Updating media information in the database
    await media.update({
      med_name: name,
      med_alt: alt,
      fk_prj_id: req.body.projectId 
    });
    
    // Sending back the updated media data
    responseHandler(media, "Media file updated successfully", 200)
      .then((result) => res.json(result))
      .catch((error) => res.status(error.status || 500).json(error));
  } catch (error) {
    // Handling errors
    responseHandler(error, "Error updating media file", 500)
      .then((result) => res.json(result))
      .catch((error) => res.status(error.status || 500).json(error));
  }
}

/**
 * Deletes a media file by its unique identifier.
 * @param {object} req - The request object, containing the Media ID in the params.
 * @param {object} res - The response object used to send back the success message or error messages.
 */
async function deleteMedia(req, res) {
  try {
    // Finding the media by its ID
    const media = await Media.findByPk(req.params.id);
    
    // If media is not found, return a 404 error
    if (!media) {
      return responseHandler(null, "Media file not found", 404)
        .then((result) => res.json(result))
        .catch((error) => res.status(error.status || 500).json(error));
    }

    // Delete the file from the server
    if (fs.existsSync(media.med_path)) {
      fs.unlinkSync(media.med_path);
    }

    // Deleting the media entry from the database
    await media.destroy();
    
    // Sending back success message
    responseHandler({}, "Media file removed successfully", 200)
      .then((result) => res.json(result))
      .catch((error) => res.status(error.status || 500).json(error));
  } catch (error) {
    // Handling errors
    responseHandler(error, "Error removing media file", 500)
      .then((result) => res.json(result))
      .catch((error) => res.status(error.status || 500).json(error));
  }
}

// Exporting all controller functions
module.exports = {
  createMedia,
  getAllMedia,
  getMediaById,
  updateMedia,
  deleteMedia,
};
