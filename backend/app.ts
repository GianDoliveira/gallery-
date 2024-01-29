import "reflect-metadata";
import express = require('express');
import cors = require('cors');
const bodyParser = require('body-parser');

import authRoutes from './src/routes/authRoutes';


const app = express();
app.use(bodyParser.json());

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);

export default app;
