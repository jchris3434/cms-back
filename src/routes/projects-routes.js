const { Router } = require('express');
const router = Router();
const {getAllProjects, getProjectById, updateProject, deleteProject, createProject } = require('../controllers/projects-controller');

router.get("/", getAllProjects);

router.get("/:id", getProjectById);

router.put("/:id", updateProject);

router.delete("/:id", deleteProject);

router.post("/", createProject);

module.exports = router;
