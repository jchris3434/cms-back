const { sequelize } = require('../config/database');
const {DataTypes } = require('sequelize');
const Project = require('../models/Project')(sequelize, DataTypes);
const { responseHandler } = require('../middleware/response-handler')

const getAllProjects = async (req,res) => {
    try{
        const projects = await Project.findAll();
        responseHandler(projects, "List of projects successfully retrieved", 200)
      .then((result) => res.json(result))
      .catch((error) => res.status(error.status || 500).json(error));
    }  catch (error) {
        responseHandler(error, "Error fetching projects", 500)
        .then((result) => res.json(result))
        .catch((error) => {
          const statusCode = error.status || 400;
          res.status(statusCode).json(error);    
        })
};
};


const getProjectById = async (req, res) => {
    try{
        const projectId = req.params.id
        const project = await Project.findByPk(projectId);
        responseHandler(
            project,
            project ? "project found" : "project not found",
            project ? 200 : 404
          )
            .then((result) => res.json(result))
            .catch((error) => res.status(error.status || 500).json(error));
    } catch (error) {
        responseHandler(error)
        .then((result) => res.json(result))
        .catch((error) => {
          const statusCode = error.status || 400;
          res.status(statusCode).json(error);    
        })
};
};

const createProject = async (req, res) => {
    try {
        const projectExists = await checkProjectExists(req.body.prj_name)
        if (projectExists) {
            return responseHandler({}, "Project already exists", 400)
        .then((result) => res.json(result))
        .catch((error) => res.status(error.status || 500).json(error));
        }
        const { prj_name } = req.body;
        const prj_prod = req.body.prj_prod || 0;
       
        // Créez le projet avec la date de création
        const newProject = await Project.create({ prj_name, prj_prod });
        responseHandler(newProject, "Project successfully created")
      .then((result) => res.json(result))
      .catch((error) => {
        const statusCode = error.status || 500;
        res.status(statusCode).json(error);
      });
    }  catch (error) {
        responseHandler(error)
        .then((result) => res.json(result))
        .catch((error) => {
          const statusCode = error.status || 400;
          res.status(statusCode).json(error);    
        })
};
};

const checkProjectExists = async (prj_name) => {
    const project = await  Project.findOne({ where: { prj_name }});
    return project;
};


const updateProject = async (req, res) => {
    try {
        const { prj_name, prj_prod } = req.body;
        const projectId = req.params.id;
        const project = await Project.findByPk(projectId);
        if (!project) {
          return responseHandler(null, "Project not found", 404)
            .then((result) => res.json(result))
            .catch((error) => res.status(error.status || 500).json(error));
        }

        // Mettez à jour le projet avec la date de modification
        const [updatedRowsCount] = await Project.update({ prj_name, prj_prod }, { where: { prj_id: projectId } });
        responseHandler(updatedUser, "Project updated successfully", 200)
        .then((result) => res.json(result))
        .catch((error) => res.status(error.status || 500).json(error));
    }  catch (error) {
        responseHandler(error)
        .then((result) => res.json(result))
        .catch((error) => {
          const statusCode = error.status || 400;
          res.status(statusCode).json(error);    
        })
};
};

const deleteProject = async (req, res) => {
    try {
        const projectId = req.params.id;
        const project = await Project.findByPk(projectId);
        if(!project) {
          return responseHandler(null, "Project not found", 404)
        .then((result) => res.json(result))
        .catch((error) => res.status(error.status || 500).json(error));
        }

        // Supprimer le projet
        await Project.destroy({ where: { prj_id: projectId } });
        responseHandler({}, "Project successfully deleted", 200)
        .then((result) => res.json(result))
        .catch((error) => res.status(error.status || 500).json(error));
    } catch (error) {
      responseHandler(error, "Error deleting Project", 500)
        .then((result) => res.json(result))
        .catch((error) => res.status(error.status || 500).json(error));
    }
};


module.exports = {
    getAllProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject
}