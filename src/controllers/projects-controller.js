const { sequilize, sequelize } = require('../config/database');
const {DataTypes } = require('sequelize');
const Project = require('../models/Project')(sequelize, DataTypes);

const getAllProjects = async (req,res) => {
    try{
        const projects = await Project.findAll();
        res.json(projects);
    } catch (error) {
        console.error('Error fetching projects:', error);
    }
};


const getProjectById = async (req, res) => {
    try{
        const project = await Project.findByPk(req.params.id);
        res.json(project);
    } catch (error) {
        console.error('Error fectching project:', error);
    }
};


const createProject = async (req, res) => {
    try {
        const { prj_name, prj_prod } = req.body;
       
        // Créez le projet avec la date de création
        const newProject = await Project.create({ prj_name, prj_prod, createdAt: new Date() });
        res.status(201).json(newProject);
    } catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const updateProject = async (req, res) => {
    try {
        const { prj_name, prj_prod } = req.body;
        const projectId = req.params.id;


        // Mettez à jour le projet avec la date de modification
        const [updatedRowsCount] = await Project.update({ prj_name, prj_prod, updatedAt: new Date() }, { where: { prj_id: projectId } });

            res.json({ message: 'Project updated successfully' });
    } catch (error) {
        console.error('Error updating project:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteProject = async (req, res) => {
    try {
        const projectId = req.params.id;

        // Supprimer le projet
        const deletedRowCount = await Project.destroy({ where: { prj_id: projectId } });
            res.json({ message: 'Project deleted successfully' });
        
    } catch (error) {
        console.error('Error deleting project:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


module.exports = {
    getAllProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject
}