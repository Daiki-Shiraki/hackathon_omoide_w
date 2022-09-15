import { Router } from "express";

const router = Router();

router.get("/book/:id", (req, res) => {
  const id = req.params.id;
  res.send(`id: ${id}`);
});

export default router;
