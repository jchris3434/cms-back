const express = require('express');
const app = express();
const PORT = 12000;
const cors = require('cors');
const db = require('./config/database');
const accessRoutes = require('./routes/access-routes');
const componentsRoutes = require('./routes/components-routes');
const contentsRoutes = require('./routes/contents-routes');
const mediasRoutes = require('./routes/medias-routes');
const pagesRoutes = require('./routes/pages-routes');
const projectsRoutes = require('./routes/projects-routes');
const rolesRoutes = require('./routes/roles-routes');
const usersRoutes = require('./routes/users-routes');
const connectDatabase = require('./config/database');

app.use("/", (req, res) => {
    res.send("Bonjour monde");
});
app.use(cors());
app.use(express.json());
// app.use('/access', accessRoutes);
// app.use('/components', componentsRoutes);
// app.use('/contents', contentsRoutes);
// app.use('/medias', mediasRoutes);
// app.use('/pages', pagesRoutes);
// app.use('/projects', projectsRoutes);
// app.use('/roles', rolesRoutes);
// app.use('/users', usersRoutes);

db.sequelize.sync().then(() => {
    console.log('Connexion à la base de données réussie et modèles synchronisés.');
    app.listen(PORT, () => console.log(`App running on port ${PORT}`));
}).catch(err => {
    console.error('Erreur lors de la synchronisation avec la base de données:', err);
});