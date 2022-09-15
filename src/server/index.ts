import express from "express";

import app from "./app";
import api from "./api";

const port = 3000;
const server = express();

server.use("/", app);

server.use("/api", api);

server.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
