const { Router } = require('express');
const router = Router();
const controller = require('../controllers/pages-controller');

router.get("/", controller.getAllPages);

router.get("/:id", controller.getPageById);

router.put("/:id", controller.updatePage);

router.delete("/:id", controller.deletePage);

router.post("/", controller.createPage);

module.exports = router;
