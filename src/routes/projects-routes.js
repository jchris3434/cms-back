const { Router } = require('express');
const router = Router();
const {getAllProjects, getProjectById, updateProject, deleteProject, createProject } = require('../controllers/projects-controller');
const { authenticateRole } = require('../middleware/authentication-handler');


const Admin = ['Admin'];
const Client = ['Admin', 'Client'];


const requireAdmin = authenticateRole(Admin);
const requireClient = authenticateRole(Client);

router.get("/", requireAdmin, getAllProjects);

router.get("/:id", requireClient, getProjectById);

router.put("/:id",  requireClient, updateProject);

router.delete("/:id", requireAdmin, deleteProject);

router.post("/",requireAdmin, createProject);

module.exports = router;
