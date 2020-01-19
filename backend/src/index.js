const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const routes = require('./routes')
mongoose.connect("mongodb+srv://rpsilva:tio5690@cluster0-pfnxd.mongodb.net/week10?retryWrites=true&w=majority", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

app.use(cors());
app.use(express.json());
app.use(routes);


app.listen(3333);