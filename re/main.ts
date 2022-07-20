import express from "express";
import expressSession from "express-session";
import path from "path";
// import bodyParser from "body-parser";
import jsonfile from "jsonfile";
import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve('./public/uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}.${file.mimetype.split('/')[1]}`);
    }
})

const upload = multer({ storage })

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(expressSession({
    secret: 'Memo wall is fun',
    resave: true,
    saveUninitialized: true,
}));

app.get('/', (req, res, next) => {
    if (req.session['counter']) {
        req.session['counter'] += 1;
    } else {
        req.session['counter'] = 1;
    }
    console.log(`req.session[counter] is ${req.session['counter']}`);
    next()
})

interface User {
    username: string
    password: string
}

interface Memo {
    content: string
    image: string
}

app.post('/memos', upload.single('image'), async function (req, res) {
    const memos = await jsonfile.readFile('./memos.json')
    const memo = req.body;
    if (req.file) {
        memo.image = req.file.filename
    }
    memos.push(memo);
    await jsonfile.writeFile('./memos.json', memos, { spaces: 4 });
    // res.redirect("/");
    res.json({ success: true })
})

app.get('/memos', async (req, res) => {
    const memos = await jsonfile.readFile('./memos.json');
    res.json(memos);
})

app.put('/memos/ :index', async (req, res) => {
    const index = parseInt(req.params.index);
    if (isNaN(index)) {
        res.status(400).json({ message: "Index is not an integer" });
        return;
    }
    const memos: Memo[] = await jsonfile.readFile('./memos.json');
    memos[index].content = req.body.content;

    await jsonfile.writeFile('./memos.json',memos, {spaces: 4})
    res.json({ success: true })
})


app.post('/login', async (req, res) => {
    const users: User[] = await jsonfile.readFile('./user.json')
    const userFound = users.find(function (user) {
        return user.username === req.body.username && user.password === req.body.password;
    })
    if (userFound) {
        req.session['user'] = userFound
        // res.redirect('/admin.html');
        res.json({ success: true })
    } else {
        // res.redirect('/index.html');
        res.json({ success: false })
    }
})

const isLoggedIn = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    if (req.session['user']) {
        next();
    } else {
        res.redirect('/');
    }
}


app.use(express.static('public'));
app.use(isLoggedIn, express.static('private'));

app.use((req, res) => {
    res.sendFile(path.join(__dirname, "public", "404.html"));
});
app.listen(8080, () => {
    console.log("Listening at http://localhost:8080")
});