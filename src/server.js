const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const crypto = require("crypto");


const port = 80;
const host_url = "https://cdn.littlepoy.xyz";


if (!fs.existsSync("./uploads")) {
    fs.mkdirSync("./uploads");
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
        // 4 byte hex yeterli
        cb(null, crypto.randomBytes(4).toString("hex") + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// test logu
app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

// sharex için endpoint
app.post("/upload", upload.single("file"), (req, res) => {
    if (!req.file) return res.status(400).send("bi dosya gönder la");
    res.send(`${host_url}/view/${req.file.filename}`);
});

// embed icin meta taglari 
app.get("/view/:file", (req, res) => {
    const f = req.params.file;
    // direkt gönderiyoruz
    res.send(`<html>
    <head>
        <meta property="og:image" content="${host_url}/uploads/${f}">
        <meta name="twitter:card" content="summary_large_image">
        <meta http-equiv="refresh" content="0; url=${host_url}/uploads/${f}">
    </head>
    <body>yükleniyor...</body>
    </html>`);
});

// statik dosyalar
app.use("/uploads", express.static("uploads"));

app.listen(port, () => console.log("sunucu port", port, "üzerinde çalışıyor"));
