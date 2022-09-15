import type { bookData, sightData } from "@/types/database";
import * as mysql from "promise-mysql";

// idから公開Bookを持ってくる
export async function getLimitedBook(id: number) {
  const connection = await mysql.createConnection({
    host: "omoide-rds-v2.cn5rx6avsd8j.ap-northeast-1.rds.amazonaws.com",
    port: 3306,
    user: "admin",
    password: "adminadmin",
    database: "omoidew",
  });
  const result = connection.query(
    `SELECT * FROM book WHERE is_gentei = 1 and sight_ID = ${id};`
  );
  connection.end();
  console.log(await result);
  return result as Promise<bookData[]>;
}

// idから限定Bookを持ってくる
export async function getUnlimitedBook(id: number) {
  const connection = await mysql.createConnection({
    host: "omoide-rds-v2.cn5rx6avsd8j.ap-northeast-1.rds.amazonaws.com",
    port: 3306,
    user: "admin",
    password: "adminadmin",
    database: "omoidew",
  });

  const result = connection.query(
    `SELECT * FROM book WHERE is_gentei = 0 and sight_ID = ${id};`
  );
  connection.end();

  return result as Promise<bookData[]>;
}

// idからSightを持ってくる
export async function getSight(id: Number) {
  const connection = await mysql.createConnection({
    host: "omoide-rds-v2.cn5rx6avsd8j.ap-northeast-1.rds.amazonaws.com",
    port: 3306,
    user: "admin",
    password: "adminadmin",
    database: "omoidew",
  });
  console.log(id);
  const result = connection.query(`SELECT * FROM sight WHERE id = ${id};`);
  connection.end();

  return result as Promise<sightData[]>;
}

// 公開本の内容を更新された順に直近"num"冊持ってくる
export async function getRecentUnlimitedBook(num: Number) {
  const connection = await mysql.createConnection({
    host: "omoide-rds-v2.cn5rx6avsd8j.ap-northeast-1.rds.amazonaws.com",
    port: 3306,
    user: "admin",
    password: "adminadmin",
    database: "omoidew",
  });
  const result = connection.query(`SELECT * FROM book WHERE is_gentei = 0 ORDER BY edit_date LIMIT ${num};`);

  connection.end();

  return result;
}

// 検索の際に使う
// 文字列を送るとそれに合った検索結果が返ってくる
export async function getSearchResult(words: string) {
  console.log(words);
  const connection = await mysql.createConnection({
    host: "omoide-rds-v2.cn5rx6avsd8j.ap-northeast-1.rds.amazonaws.com",
    port: 3306,
    user: "admin",
    password: "adminadmin",
    database: "omoidew",
  });

  const result = connection.query(
    `SELECT * FROM book WHERE is_gentei = 0 and name LIKE \"` + words + `\"`
  );
  console.log(`SELECT * FROM book WHERE is_gentei = 0 and name LIKE BINARY \"%` + words + `%\";`);
  connection.end();

  return result;
}

// 受け取った画像をデータベースに保存する
export async function storeLimitedBook(id: number, canvas: string) {
  const connection = await mysql.createConnection({
    host: "omoide-rds-v2.cn5rx6avsd8j.ap-northeast-1.rds.amazonaws.com",
    port: 3306,
    user: "admin",
    password: "adminadmin",
    database: "omoidew",
  });
  const result = connection.query(
    `UPDATE book SET canvas = \"${canvas}\" WHERE is_gentei = 1 and sight_ID = ${id}; `
  );
  connection.end();

  return result;
}

// 受け取った画像をデータベースに保存する
export async function storeUnlimitedBook(id: number, canvas: string) {
  const connection = await mysql.createConnection({
    host: "omoide-rds-v2.cn5rx6avsd8j.ap-northeast-1.rds.amazonaws.com",
    user: "admin",
    password: "adminadmin",
    database: "omoidew",
    multipleStatements: true,
  });
  const result = connection.query(
    `UPDATE book SET canvas = \"${canvas}\" WHERE is_gentei = 0 and sight_ID = ${id}; `
  );
  connection.end();

  return result;
}
