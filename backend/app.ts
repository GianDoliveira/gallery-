import "reflect-metadata";
import express = require('express');
import cors = require('cors');
import bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.use(cors());
app.use(express.json());

// app.use('/auth', authRoutes);

export default app;
