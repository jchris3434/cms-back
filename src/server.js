const express = require('express');
const app = express();
const PORT = 12000;

app.use("/", (req, res) => {
    res.send("Bonjour monde");
});

app.listen(PORT, () => console.log("App running on port " + PORT));
