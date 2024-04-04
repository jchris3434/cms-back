const { Router } = require('express');
const router = Router();
const {getAllProjects, getProjectById, updateProject, deleteProject, createProject } = require('../controllers/projects-controller');
const { authenticateRole } = require('../middleware/authentication-handler');


// Importez les rôles appropriés depuis le fichier où ils sont définis
const { Admin, Client } = require('../models/Role');

// Définissez les exigences de rôle correctement
const requireAdmin = authenticateRole([Admin]);
const requireClient = authenticateRole([Admin, Client]);

router.get("/", requireAdmin, getAllProjects);

router.get("/:id", requireClient, getProjectById);

router.put("/:id",  requireClient, updateProject);

router.delete("/:id", requireAdmin, deleteProject);

router.post("/",requireAdmin, createProject);

module.exports = router;
