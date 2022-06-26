import express from "express";
import type {Request, Response, NextFunction} from "express";
import path from "path";
import fs from "fs";
import formidable from "formidable";
import  type {Fields, Files } from "formidable";
import { readJsonfile, writeJsonFile } from "./jsonfile";
import { Memo } from "./model";

const MEMO_JSON_PATH = path.join(__dirname, "data", "memo.json");

const app = express();

declare global {
    namespace Express {
        interface Request {
            form?: any;
            fields: Fields;
            files: Files;
        }
    }
}

const uploadDir = 'uploads'
fs.mkdirSync(uploadDir, { recursive: true })

const form = formidable({
  uploadDir,
  keepExtensions: true,
  maxFiles: 1,
  maxFileSize: 200 * 1024 ** 2, // the default limit is 200KB
  filter: part => part.mimetype?.startsWith('image/') ||part.mimetype?.startsWith('application/pdf') || false,
})

const formidableMiddleware = (req: Request, res: Response, next: NextFunction) => {
    form.parse(req, (err, fields, files) => {
        console.log({ err, fields, files })
        if (err) {
            console.error(err);
            res.redirect("/500.html");
            return;
        }
        
        req.form = {fields, files };
        next()
      });
};

app.use((req, res, next) => {
    console.log(`req path: ${req.path}, method: ${req.method}`);
    next();
});

app.post("/memos", formidableMiddleware, async (req, res) => {
    console.log(req.form);
    const content = req.form?.fields.content as string;
    const image = req.form?.files.image["newFilename"];
    const memos = await readJsonfile<Memo>(MEMO_JSON_PATH);
    memos.push({content, image});
    await writeJsonFile(MEMO_JSON_PATH, memos)
    res.redirect("/");
});

app.use(express.static(path.join(__dirname, "public")));
app.use((req, res) => {
    // res.redirect("/404.html");
    res.sendFile(path.join(__dirname, "public", "404.html"));
});

const PORT = 8080;
app.listen(PORT, ()=>{
    console.log(`listening at http://localhost:${PORT}`);
});