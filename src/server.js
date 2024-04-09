const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const dbConfig = require('./config/database');
const port = process.env.PORT;
const accessRoutes = require('./routes/access-routes');
const componentsRoutes = require('./routes/components-routes');
const contentsRoutes = require('./routes/contents-routes');
const mediasRoutes = require('./routes/medias-routes');
const pagesRoutes = require('./routes/pages-routes');
const projectsRoutes = require('./routes/projects-routes');
const rolesRoutes = require('./routes/roles-routes');
const usersRoutes = require('./routes/users-routes');

dbConfig.databaseConnection();

app.use(cors());
app.use(express.json());
app.use('/users', usersRoutes);

app.use('/access', accessRoutes);
app.use('/components', componentsRoutes);
app.use('/contents', contentsRoutes);
app.use('/medias', mediasRoutes);
app.use('/pages', pagesRoutes);
app.use('/projects', projectsRoutes);
app.use('/roles', rolesRoutes);


app.listen(port, () => console.log(`App running on port ${port}`));