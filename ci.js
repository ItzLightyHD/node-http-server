const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const fs = require('fs');

if(!fs.existsSync(path.join(process.cwd(), 'public'))) {
    console.warn("[Server thread/WARN] Directory 'public' doesn't exist, be sure to create it!");
}

if(!fs.existsSync(path.join(process.cwd(), 'public/index.html'))) {
    console.warn("[Server thread/WARN] 'index.html' file not found, listing all files instead");
    app.get('/', function (req, res) {
        fs.readdir(path.join(process.cwd(), 'public'), function (err, files) {
            if (err) {
                console.error("[Server thread/ERROR] Cannot list 'public' directory files");
                res.send("Cannot list 'public' directory files");
                return;
            }
            res.send(files);
        });
      });
}

app.use(express.static(path.join(process.cwd(), 'public')));

app.listen(port, () => console.log(`[Server thread/INFO] Static files from 'public' hosting started on port ${port}`));

process.exit(0);