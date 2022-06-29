import dotenv from "dotenv";
import xlsx from "xlsx";
import pg from "pg";
import path from "path";

dotenv.config(); // .env in your starting folder

interface User {
  username: string;
  password: string;
}

interface Memo {
  content: string;
}

async function main() {
  const client = new pg.Client({
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  });

  await client.connect();
  console.log("connected");

  try {
    const filename = path.join(__dirname, "data", "WSP009-exercise.xlsx");
    const workbook = xlsx.readFile(filename);

    const userWorksheet = workbook.Sheets["user"];
    const users = xlsx.utils.sheet_to_json<User>(userWorksheet);
    const memoWorksheet = workbook.Sheets["memo"];
    const memos = xlsx.utils.sheet_to_json<Memo>(memoWorksheet);

    // Delete Data
    await client.query(/*sql */ `DELETE FROM users`);
    await client.query(/*sql */ `DELETE FROM memos`);

    // Method 1
    for (const user of users) {
      const sqlQuery = /*sql */ `INSERT INTO users (username, password) VALUES ($1, $2)`;
      await client.query(sqlQuery, [user.username, user.password]);
    }
    const userResult = await client.query(/*sql */ `SELECT * FROM users`);
    console.log(userResult.rows);

    // Method 2
    let sqlQuery = /*sql */ `INSERT INTO memos (content) VALUES`;
    let valueArr: string[] = [];
    for (let i = 1; i <= memos.length; i++) {
      if (i < memos.length) {
        sqlQuery += ` ($${i}),`;
      } else {
        sqlQuery += ` ($${i});`;
      }
      valueArr.push(memos[i - 1].content);
    }
    await client.query(sqlQuery, valueArr);
    const memoResult = await client.query(/*sql */ `SELECT * FROM memos`);
    console.log(memoResult.rows);
  } catch (err) {
    console.error(err.message);
  } finally {
    await client.end();
    console.log("ended");
  }
}

main();
