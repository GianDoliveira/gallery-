import "reflect-metadata";
import express = require('express');
import cors = require('cors');
import bodyParser = require('body-parser');
import router from "./routes";

const app = express();
app.use(express.json());
app.use(bodyParser.json());

app.use(cors());
app.use(router)

export default app;
