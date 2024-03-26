const { sequelize } = require('../src/config/database');
const { DataTypes } = require('sequelize');
const initializeModel = (path, sequelize, DataTypes) => {
    const model = require(path);
    return model(sequelize, DataTypes);
};
const entities = [
    {
        name: 'User',
        model: initializeModel("../src/models/User", sequelize, DataTypes),
        primaryKey : 'usr_id',
        testData: { usr_username: 'Test User', usr_password: 'password', fk_rol_id: 1 },
        updateData: { usr_username: 'updatedUser' }
    },
    {
        name: 'Project',
        model: initializeModel("../src/models/Project", sequelize, DataTypes),
        primaryKey : 'prj_id',
        testData: { prj_name: 'Test Project', prj_prod: 0 },
        updateData: { prj_name: 'updatedProject' }
    },
    {
        name: 'Role',
        model: initializeModel("../src/models/Role", sequelize, DataTypes),
        primaryKey : 'rol_id',
        testData: { rol_name: 'Test Role' },
        updateData: { rol_name: 'updatedRole' }
    },
    {
        name: 'Access',
        model: initializeModel("../src/models/Access", sequelize, DataTypes),
        primaryKey : 'acs_id',
        testData: { fk_prj_id: 1, fk_usr_id: 1 },
        updateData: { fk_prj_id: 2 }
    },
    {
        name: 'Component',
        model: initializeModel("../src/models/Component", sequelize, DataTypes),
        primaryKey : 'cpn_id',
        testData: { cpn_name: 'Test Component', cpn_allowChild: true, cpn_styleTemplate: '{}', cpn_classTemplate: '{}', cpn_path: '/test/component' },
        updateData: { cpn_name: 'updatedComponent' }
    },
    {
        name: 'Content',
        model: initializeModel("../src/models/Content", sequelize, DataTypes),
        primaryKey : 'cnt_id',
        testData: { cnt_name: 'Test Content', cnt_styleTemplate: '{}', cnt_classTemplate: '{}', fk_pag_id: 1 },
        updateData: { cnt_name: 'updatedContent' }
    },
    {
        name: 'Media',
        model: initializeModel("../src/models/Media", sequelize, DataTypes),
        primaryKey : 'med_id',
        testData: { med_name: 'Test Media', med_type: 'image/png', med_path: '/path/to/media.png', fk_prj_id: 1 },
        updateData: { med_name: 'updatedMedia' }
    },
    {
        name: 'Page',
        model: initializeModel("../src/models/Page", sequelize, DataTypes), 
        primaryKey : 'pag_id',
        testData: { pag_name: 'Test Page', pag_url: '/test-page', fk_prj_id: 1 },
        updateData: { pag_name: 'updatedPage' }
    }
];


describe('Generic CRUD Operations for All Entities', () => {
    beforeAll(async () => {
        await sequelize.sync();
    });

    afterAll(async () => {
        await sequelize.close();
    });

    entities.forEach(entity => {
        describe(`${entity.name} Operations`, () => {
            let createdEntity;

            it(`Creates a ${entity.name}`, async () => {
                createdEntity = await entity.model.create(entity.testData);
                expect(createdEntity).toBeDefined();
                // Autres assertions spécifiques à l'entité si nécessaire
            });

            it(`Retrieves a ${entity.name}`, async () => {
                
                const foundEntity = await entity.model.findByPk(createdEntity.id);
                expect(foundEntity).toBeDefined();
            });

            it(`Updates and retrieves a ${entity.name}`, async () => {
                expect(createdEntity).not.toBeNull();
    
                const entityId = createdEntity[entity.primaryKey];
    
                // Mettre à jour l'entité
                await createdEntity.update(entity.updateData);
    
                // Récupérer l'entité mise à jour
                let updatedEntity = await entity.model.findByPk(entityId);
                expect(updatedEntity).not.toBeNull();
    
                // Vérifier les données mises à jour
                Object.keys(entity.updateData).forEach(key => {
                    expect(updatedEntity[key]).toEqual(entity.updateData[key]);
                });
            });

            it(`Deletes a ${entity.name}`, async () => {
                await createdEntity.destroy();
                const deletedEntity = await entity.model.findByPk(createdEntity.id);
                expect(deletedEntity).toBeNull();
            });
        });
    });
});
