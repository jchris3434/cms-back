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

app.use("home", (req, res) => {
    res.send("Bonjour monde");
});
app.use(cors());
app.use(express.json());
app.use('/users', usersRoutes);

app.listen(port, () => console.log(`App running on port ${port}`));