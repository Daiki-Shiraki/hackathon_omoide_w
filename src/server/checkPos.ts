import { getLimitedBook, getUnlimitedBook, getSight } from "./connectDB";

const R = Math.PI / 180;

const threshold = 10; // 閾値は10km

export async function checkPosition(
  id: number,
  gotLatitude: number,
  gotLongitude: number
) {
  // 対象のSightを取得
  const sightData = await getSight(id); // 一意に定まる
  const sightName = sightData[0].name;
  // 辞書の中から位置情報のみを取得
  const RealLatitude = sightData[0].latitude;
  const RealLongitude = sightData[0].longitude;

  // 距離を算出
  const dist = distance(gotLatitude, gotLongitude, RealLatitude, RealLongitude);
  // console.log(dist);
  let limitedBookData, unlimitedBookData;
  let limitBreak = 0;
  // 位置情報で場合分け
  if (dist < threshold) {
    limitBreak = 1;
    limitedBookData = await getLimitedBook(id);
    unlimitedBookData = await getUnlimitedBook(id);
  } else {
    limitBreak = 0;
    limitedBookData = null;
    unlimitedBookData = await getLimitedBook(id);
  }
  // 取得データと場合分け結果を返す
  const data = {
    sightName,
    limitBreak,
    unlimitedBookData,
    limitedBookData,
  };
  
  return data;
}
// 二地点の緯度経度を入力すると距離をkmで返す
function distance(lat1: number, lng1: number, lat2: number, lng2: number) {
  // console.log(lat1, lng1, lat2, lng2);
  lat1 *= R;
  lng1 *= R;
  lat2 *= R;
  lng2 *= R;
  return (
    6371 *
    Math.acos(
      Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1) +
        Math.sin(lat1) * Math.sin(lat2)
    )
  );
}
