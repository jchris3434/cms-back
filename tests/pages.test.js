const { sequelize } = require('../src/config/database');
const { DataTypes } = require('sequelize');
const Page = require("../src/models/Page")(sequelize, DataTypes);
const {
  getAllPages,
  getPageById,
  updatePage,
  deletePage,
  createPage
} = require("../src/controllers/pages-controller");

const Project = require("../src/models/Project")(sequelize, DataTypes);

describe('Page CRUD Operations', () => {
  beforeAll(async () => {
    // Setup Database
    await sequelize.sync({ force: true });
    Project.create({
      prj_name: 'Test Project',
      prj_prod: 0
    })
  });

  afterAll(async () => {
    // Close Database connection
    await sequelize.close();
  });

  it('should create a new page', async () => {
    const req = {
      body: {
        fk_prj_id: 1,
        pag_name: 'New Page'
      }
    };
    const res = {
      json: jest.fn()
    };
    await createPage(req, res);
    expect(res.json).toHaveBeenCalled();
  });

  it('should retrieve all pages', async () => {
    const req = {};
    const res = {
      json: jest.fn()
    };
    await getAllPages(req, res);
    expect(res.json).toHaveBeenCalled();
  });

  it('should retrieve a specific page by id', async () => {
    const req = {
      params: {
        id: 1
      }
    };
    const res = {
      json: jest.fn()
    };
    await getPageById(req, res);
    expect(res.json).toHaveBeenCalled();
  });

  it('should update an existing page', async () => {
    const req = {
      params: {
        id: 1
      },
      body: {
        pag_name: 'Updated Page'
      }
    };
    const res = {
      json: jest.fn()
    };
    await updatePage(req, res);
    expect(res.json).toHaveBeenCalled();
  });

  it('should delete an existing page', async () => {
    const req = {
      params: {
        id: 1
      }
    };
    const res = {
      json: jest.fn(),
      status: jest.fn(() => res),
      json: jest.fn()
    };
    await deletePage(req, res);
    expect(res.json).toHaveBeenCalled();
  });
});
