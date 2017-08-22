const express = require('express');
const app = express();


app.use(express.static('../build'));

const port = 3000;
app.listen(port, () => {
    console.log("running on " + port);
});