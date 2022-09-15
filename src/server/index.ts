import express from "express";

import app from "./app";
import api from "./api";

const port = process.env["PORT"] || 3000;
const server = express();

server.use("/", app);

server.use("/api", api);

server.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
