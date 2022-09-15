import { Router } from "express";

const router = Router();

router.get("/book/:id", (req, res) => {
  const id = req.params.id;
  const latitude = req.query["latitude"];
  const longitude = req.query["longitude"];
  const data = {
    id,
    latitude,
    longitude,
  };
  res.send(JSON.stringify(data));
});

export default router;
