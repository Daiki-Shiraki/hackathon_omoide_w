import { Router } from "express";
import { checkPosition } from "./checkPos";
import {
  getRecentUnlimitedBook,
  storeLimitedBook,
  storeUnlimitedBook,
} from "./connectDB";

const router = Router();

router.get("/book/:id", async(req, res) => {
  const id = req.params.id;
  const latitude = req.query["latitude"];
  const longitude = req.query["longitude"];
  // bookの取得と位置情報が一致しているかどうかを取得
  const data = await checkPosition(Number(id), Number(latitude), Number(longitude));
  console.log(data);
  res.send(JSON.stringify(data));
});

router.get("/resent", async(req, res) => {
  const num = Number(req.query["num"]);
  console.log("-------------"+ num);
  const data = await getRecentUnlimitedBook(num);
  console.log(data);
  res.send(JSON.stringify(data));
});

router.get("/limited/:id", async(req, res) => {
  const id = req.params.id;
  const canvas = req.query["canvas"];
  const data = await storeLimitedBook(Number(id), String(canvas));
  console.log(data);
  res.send(JSON.stringify(data));
});

router.get("/unlimited/:id", async(req, res) => {
  const id = req.params.id;
  const canvas = req.query["canvas"];
  const data = await storeUnlimitedBook(Number(id), String(canvas));
  console.log(data);
  res.send(JSON.stringify(data));
});

// router.get("/book/search", (req, res) => {});

export default router;
