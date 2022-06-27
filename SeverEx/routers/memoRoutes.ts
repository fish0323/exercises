import express from "express";
import type { Request, Response, NextFunction } from "express";
import { logger } from "../logger";
import jsonfile from "jsonfile";
import path from "path";
import { Memo } from "../model";
import { readJsonfile, writeJsonFile } from "../jsonfile";

export const memoRoutes = express.Router();

const MEMO_JSON_PATH = path.join(__dirname, "..", "data", "memo.json");

memoRoutes.use((req, res, next) => {
  logger.debug("testing");
  next();
});

memoRoutes.get("/", getMemos);

async function getMemos(req: Request, res: Response, next: NextFunction) {
  const memos: Array<Memo> = await jsonfile.readFile(MEMO_JSON_PATH);
  res.json(memos);
}

app.post("/memos", formidableMiddleware, async (req: Request, res: Response) => {
  console.log(req.form);
  const content = req.form?.fields.content as string;
  const image = req.form?.files.image["newFilename"];
  const memos = await readJsonfile<Memo>(MEMO_JSON_PATH);
  memos.push({ content, image });
  await writeJsonFile(MEMO_JSON_PATH, memos);
  res.redirect("/");
});
function formidableMiddleware(
  arg0: string,
  formidableMiddleware: any,
  arg2: (req: any, res: any) => Promise<void>
) {
  throw new Error("Function not implemented.");
}
