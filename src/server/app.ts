import express, { Router } from "express";
import { join, resolve } from "path";

const router = Router();

const browserPath = resolve("./browser");
const getPage = (name: string) => {
  const targetPath = join(browserPath, `${name}.html`);
  return targetPath;
};

router.use("/assets", express.static(join(browserPath, "assets")));

router.get("/", (_, res) => {
  const targetPath = getPage("home");
  res.sendFile(targetPath);
});

router.get("/book", (_, res) => {
  const targetPath = getPage("book");
  res.sendFile(targetPath);
});

export default router;
