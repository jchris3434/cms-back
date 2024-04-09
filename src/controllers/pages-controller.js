const { sequelize } = require('../config/database');
const { DataTypes } = require('sequelize');
const Page = require("../models/Page")(sequelize, DataTypes);
const { responseHandler } = require("../middleware/response-handler");
const { getProjectById } = require('../controllers/projects-controller');

const getAllPages = async (req, res) => {
  try {
    const pages = await Page.findAll();
    responseHandler(pages, "List of pages successfully retrieved", 200)
    .then((result) => res.json(result))
    .catch((error) => res.status(error.status || 500).json(error));
  } catch (error) {
    responseHandler(error, "Error fetching pages", 500)
      .then((result) => res.json(result))
      .catch((error) => res.status(error.status || 400).json(error));
  }
};

const getPageById = async (req, res) => {
  try {
    const page = await Page.findByPk(req.params.id);
    responseHandler(
      page,
      page ? "page found" : "page not found",
      page ? 200 : 404
    )
    .then((result) => res.json(result))
    .catch((error) => res.status(error.status || 500).json(error));
  } catch (error) {
    responseHandler(error, "Error fetching page", 500)
      .then((result) => res.json(result))
      .catch((error) => res.status(error.status || 400).json(error));
  }
}

const updatePage = async (req, res) => {
  try {
    const page = await Page.findByPk(req.params.id);
    let url = page.pag_url;
    let pageName = page.pag_name;
    if (!page) {
      return responseHandler(null, "Page not found", 404)
        .then((result) => res.json(result))
        .catch((error) => res.status(error.status || 500).json(error));
    }
    if (req.body.pag_name !== undefined && req.body.pag_name !== pageName) {
      url = page.pag_url.replace(pageName, req.body.pag_name);
      const pages = await Page.findAll({where: { pag_parent: req.params.id }});
      pages.forEach(async (page) => {
        editUrl(page, req.body.pag_name, pageName);
      });
      pageName = req.body.pag_name;
    }
    if (req.body.pag_parent !== undefined && req.body.pag_parent !== page.pag_parent) {
      if (req.body.pag_parent !== null) {
        const parentPage = await Page.findByPk(req.body.pag_parent);
        if (!parentPage) {
          return responseHandler(null, "Parent Page not found", 404)
            .then((result) => res.json(result))
            .catch((error) => res.status(error.status || 500).json(error));
        } else {
          url = parentPage.pag_url.replace(" ", "_") + "/" + pageName.replace(" ", "_");
        }
      } else {
        url = "/" + pageName.replace(" ", "_");
      }
      const pages = await Page.findAll({where: { pag_parent: req.params.id }});
      pages.forEach(async (childPage) => {
        editUrl(childPage, url, page.pag_url);
      });
    }
    req.body.pag_url = url;
    const pageUpdate = await page.update(req.body);
    responseHandler(pageUpdate, "Page updated successfully", 200)
    .then((result) => res.json(result))
    .catch((error) => res.status(error.status || 500).json(error));
  } catch (error) {
    responseHandler(error, "Error updating page", 500)
      .then((result) => res.json(result))
      .catch((error) => res.status(error.status || 400).json(error));
  }
}

const deletePage = async (req, res) => {
  try {
    const page = await Page.findByPk(req.params.id);
    if (!page) {
      return responseHandler(null, "Page not found", 404)
        .then((result) => res.json(result))
        .catch((error) => res.status(error.status || 500).json(error));
    } 
    await page.destroy();
    responseHandler({}, "Page successfully deleted", 200)
      .then((result) => res.json(result))
      .catch((error) => res.status(error.status || 500).json(error));
  } catch (error) {
    responseHandler(error, "Error deleting page", 500)
      .then((result) => res.json(result))
      .catch((error) => res.status(error.status || 400).json(error));
  }
}

const createPage = async (req, res) => {
  try {
    const pageExists = await checkPageExists(req.body.pag_name);
    if (pageExists) {
      return responseHandler({}, "Page already exists", 400)
        .then((result) => res.json(result))
        .catch((error) => res.status(error.status || 500).json(error));
    }
    const project = await getProjectById(req.body.fk_prj_id);
    if (project == null) {
      return responseHandler(null, "Projet Page not found", 404)
      .then((result) => res.json(result))
      .catch((error) => res.status(error.status || 500).json(error));    }

    let url = "";
    if (req.body.pag_parent != null) {
      const parentPage = await Page.findByPk(req.body.pag_parent);
      if (!parentPage) {
        return responseHandler(null, "Parent Page not found", 404)
          .then((result) => res.json(result))
          .catch((error) => res.status(error.status || 500).json(error));
      } else {
        url = parentPage.pag_url.replace(" ", "_") + "/" + req.body.pag_name.replace(" ", "_");
      }
    } else {
      url = "/" + req.body.pag_name.replace(" ", "_");
    }
    console.log(url);
    req.body.pag_url = url;
    const page = await Page.create(req.body);
    responseHandler(page, "Page successfully created", 200)
      .then((result) => res.json(result))
      .catch((error) => {
        const statusCode = error.status || 500;
        res.status(statusCode).json(error);
      });
  } catch (error) {
    responseHandler(error)
      .then((result) => res.json(result))
      .catch((error) => {
        const statusCode = error.status || 400;
        res.status(statusCode).json(error);
      });
  }
}


/**
 * Checks if a page exists in the database by their pagename.
 * @param {string} usr_username - The page name to check for existence.
 * @returns {Promise<boolean>} - A promise that resolves with true if the page exists, false otherwise.
 */

const checkPageExists = async (pag_name) => {
  const page = await Page.findOne({ where: { pag_name } });
  return page;
};

async function editUrl(page, newName, oldName) {
  page.pag_url = page.pag_url.replace(oldName, newName.replace(" ", "_"));
  page.save();
  const pages = await Page.findAll({where: { pag_parent: page.pag_id }});
  pages.forEach(async (childPage) => {
    editUrl(childPage, newName, oldName)
  });
}

module.exports = {
  getAllPages,
  getPageById,
  updatePage,
  deletePage,
  createPage
}
