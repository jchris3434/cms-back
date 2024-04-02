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
    res.json(files);
  } catch (error) {
    // Handling errors
    responseHandler(error, "Error fetching all files")
      .then((response) => res.status(response.status).json(response))
      .catch((err) => res.status(500).json(err));
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
      return res.status(404).json({ message: 'Media not found' });
    }
    
    // Sending back the fetched media data
    res.json(media);
  } catch (error) {
    // Handling errors
    responseHandler(error, "Error fetching file by ID")
      .then((response) => res.status(response.status).json(response))
      .catch((err) => res.status(500).json(err));
  }
}

/**
 * Create a new media with the provided details.
 * @param {object} req - The request object containing media data in the body.
 * @param {object} res - The response object used to send back the created media data or error messages.
 */
async function createMedia(req, res) {
  try {
    // Extracting file information from the request
    const file = req.file;

    // Save file to the server
    const filePath = path.join(__dirname, 'uploads', file.originalname);
    await fs.promises.writeFile(filePath, file.buffer);

    // Creating a new media entry in the database
    const media = await Media.create({
      med_name: file.originalname,
      med_type: file.mimetype,
      med_path: filePath,
      fk_prj_id: req.body.projectId 
    });
    
    // Sending back the created media data
    res.json(media);
  } catch (error) {
    // Handling errors
    responseHandler(error, "Error creating file")
      .then((response) => res.status(response.status).json(response))
      .catch((err) => res.status(500).json(err));
  }
}

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
    res.json(files);
  } catch (error) {
    // Handling errors
    responseHandler(error, "Error fetching all files")
      .then((response) => res.status(response.status).json(response))
      .catch((err) => res.status(500).json(err));
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
      return res.status(404).json({ message: 'Media not found' });
    }
    
    // Sending back the fetched media data
    res.json(media);
  } catch (error) {
    // Handling errors
    responseHandler(error, "Error fetching file by ID")
      .then((response) => res.status(response.status).json(response))
      .catch((err) => res.status(500).json(err));
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
    const file = req.file;

    // Finding the media by its ID
    const media = await Media.findByPk(req.params.id);
    
    // If media is not found, return a 404 error
    if (!media) {
      return res.status(404).json({ message: 'Media not found' });
    }
    
    // Update file on the server
    const filePath = path.join(__dirname, 'uploads', file.originalname);
    await fs.promises.writeFile(filePath, file.buffer);

    // Delete the old file
    if (fs.existsSync(media.med_path)) {
      fs.unlinkSync(media.med_path);
    }

    // Updating media information in the database
    await media.update({
      med_name: file.originalname,
      med_type: file.mimetype,
      med_path: filePath,
      fk_prj_id: req.body.projectId 
    });
    
    // Sending back the updated media data
    res.json(media);
  } catch (error) {
    // Handling errors
    responseHandler(error, "Error updating file")
      .then((response) => res.status(response.status).json(response))
      .catch((err) => res.status(500).json(err));
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
        return res.status(404).json({ message: 'Media not found' });
      }

      // Delete the file from the server
      if (fs.existsSync(media.med_path)) {
        fs.unlinkSync(media.med_path);
      }

      // Deleting the media entry from the database
      await media.destroy();
      
      // Sending back success message
      res.json({ message: 'Media removed successfully' });
    } catch (error) {
      // Handling errors
      responseHandler(error, "Error removing file")
        .then((response) => res.status(response.status).json(response))
        .catch((err) => res.status(500).json(err));
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