const { sequelize } = require('../config/database');
const { DataTypes } = require('sequelize');
const Page = require("../models/Page")(sequelize, DataTypes);

const getAllPages = async (req, res) => {
  try {
    const pages = await Page.findAll();
    res.json(pages);
  } catch (error) {
    console.error('Error fetching pages:', error);
  }
};

const getPageById = async (req, res) => {
  try {
    const page = await Page.findByPk(req.params.id);
    res.json(page);
  } catch (error) {
    console.error('Error fetching page:', error);
  }
}

const updatePage = async (req, res) => {
  try {
    const page = await Page.findByPk(req.params.id);
    let url = page.pag_url;
    let pageName = page.pag_name;
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
          return res.status(404).json({ message: 'Parent page not found' });
        } else {
          url = parentPage.pag_url + "/" + pageName;
        }
      } else {
        url = "/" + pageName;
      }
      const pages = await Page.findAll({where: { pag_parent: req.params.id }});
      pages.forEach(async (childPage) => {
        editUrl(childPage, url, page.pag_url);
      });
    }
    req.body.pag_url = url;
    await page.update(req.body);
    res.json(page);
  } catch (error) {
    console.error('Error updating page:', error);
  }
}

const deletePage = async (req, res) => {
  try {
    const page = await Page.findByPk(req.params.id);
    if (page) {
      await page.destroy();
      res.json({ message: 'Page deleted successfully' });
    } else {
      res.status(404).json({ message: 'Page not found' });
    }
  } catch (error) {
    console.error('Error deleting page:', error);
  }
}

const createPage = async (req, res) => {
  try {
    const project = await projectController.getProjectById(req.body.fk_prj_id);
    if (project == null) {
      return res.status(404).json({ message: 'Project not found' });
    }
    let url = "";
    if (req.body.pag_parent != null) {
      const parentPage = await Page.findByPk(req.body.pag_parent);
      if (!parentPage) {
        return res.status(404).json({ message: 'Parent page not found' });
      } else {
        url = parentPage.pag_url + "/" + req.body.pag_name;
      }
    } else {
      url = "/" + req.body.pag_name;
    }
    console.log(url);
    req.body.pag_url = url;
    const page = await Page.create(req.body);
    res.json(page);
  } catch (err) {
    console.error('Error creating page:', err);
  }
}

async function editUrl(page, newName, oldName) {
  page.pag_url = page.pag_url.replace(oldName, newName);
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