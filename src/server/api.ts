import { getSearchResults } from "./../browser/home/script/api";
import { json, Router } from "express";
import { checkPosition } from "./checkPos";
import {
  getRecentUnlimitedBook,
  storeLimitedBook,
  storeUnlimitedBook,
  getSearchResult,
  getLimitedBook,
  getUnlimitedBook,
} from "./connectDB";

const router = Router();
router.use(json());

// 位置情報に合った本を取得
router.get("/book/:id", async (req, res) => {
  const id = req.params.id;
  const latitude = req.query["latitude"];
  const longitude = req.query["longitude"];
  // bookの取得と位置情報が一致しているかどうかを取得
  const data = await checkPosition(
    Number(id),
    Number(latitude),
    Number(longitude)
  );
  console.log(data);
  res.send(JSON.stringify(data));
});

// 直近num冊の公開本を取得
router.get("/resent", async (req, res) => {
  const num = Number(req.query["num"]);
  console.log("-------------" + num);
  const data = await getRecentUnlimitedBook(num);
  console.log(data);
  res.send(JSON.stringify(data));
});

// idを渡して限定本を取得
router.get("/limited/get/:id", async (req, res) => {
  const id = Number(req.params.id);
  const data = await getUnlimitedBook(id);
  res.send(JSON.stringify(data));
});

// idとCanvasを渡して限定本を保存
router.post("/limited/sent/:id", async (req, res) => {
  const id = Number(req.body.id);
  const canvas = String(req.body.img);
  await storeLimitedBook(id, canvas);
});

// idを渡して公開本を取得
router.get("/unlimited/get/:id", async (req, res) => {
  const id = Number(req.params.id);
  const data = await getUnlimitedBook(id);
  res.send(JSON.stringify(data));
});

// idとCanvasを渡して公開本を保存
router.post("/unlimited/sent", async (req, res) => {
  const id = Number(req.body.id);
  const canvas = String(req.body.img);
  await storeUnlimitedBook(id, canvas);
});
// wordで検索した結果を取得（完全一致のみ）
router.get("/book-search", async (req, res) => {
  const word = String(req.query["word"]);
  console.log(word);
  const data = await getSearchResult(word);
  res.send(JSON.stringify(data));
});

router.get("/recent", async (req, res) => {
  const num = Number(req.query["num"]);
  console.log("-------------" + num);
  const data = await getRecentUnlimitedBook(num);
  console.log(data);
  res.send(JSON.stringify(data));
});

router.get("/limited/:id", async (req, res) => {
  const id = req.params.id;
  const canvas = req.query["canvas"];
  const data = await storeLimitedBook(Number(id), String(canvas));
  console.log(data);
  res.send(JSON.stringify(data));
});

router.get("/unlimited/:id", async (req, res) => {
  const id = req.params.id;
  const canvas = req.query["canvas"];
  const data = await storeUnlimitedBook(Number(id), String(canvas));
  console.log(data);
  res.send(JSON.stringify(data));
});

// router.get("/book/search", (req, res) => {});

export default router;
