import { getLimitedBook, getUnlimitedBook, getSight } from "./connectDB";

const R = Math.PI / 180;

const threshold = 2500; // 閾値は10km

export async function checkPosition(
  id: number,
  gotLatitude: number,
  gotLongitude: number
) {
  // 対象のSightを取得
  const sightDataArray = await getSight(id || 0); // 一意に定まる
  if (!sightDataArray.length) return;
  const sightData = sightDataArray[0]!;
  const sightName = sightData.name;
  // 辞書の中から位置情報のみを取得
  const RealLatitude = sightData.latitude;
  const RealLongitude = sightData.longitude;

  // 距離を算出
  const dist = distance(gotLatitude, gotLongitude, RealLatitude, RealLongitude);
  // 位置情報で場合分け
  if (dist < threshold) {
    const limitBreak = 1;
    const limitedBookData = await getLimitedBook(id);
    const unlimitedBookData = await getUnlimitedBook(id);
    return {
      sightName,
      limitBreak,
      unlimitedBookData,
      limitedBookData,
    };
  } else {
    const limitBreak = 0;
    const limitedBookData = null;
    const unlimitedBookData = await getUnlimitedBook(id);
    return {
      sightName,
      limitBreak,
      unlimitedBookData,
      limitedBookData,
    };
  }
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
