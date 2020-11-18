const path = require('path');
const config = require(path.join(process.cwd(), 'config.json'));
const express = require('express');
const app = express();
const fs = require('fs');

if(!fs.existsSync(path.join(process.cwd(), config.webdir))) {
    console.warn("[Server thread/WARN] Directory "+ config.webdir + " doesn't exist, be sure to create it!");
}

if(!fs.existsSync(path.join(process.cwd(), `${config.webdir}/${config.index}`))) {
    console.warn("[Server thread/WARN] " + config.index + " file not found, listing all files instead");
    app.get('/', function (req, res) {
        fs.readdir(path.join(process.cwd(), config.webdir), function (err, files) {
            if (err) {
                console.error("[Server thread/ERROR] Cannot list 'public' directory files");
                res.send("Cannot list 'public' directory files");
                return;
            }
            res.send(files);
        });
      });
}

app.use(express.static(path.join(process.cwd(), config.webdir)));

app.listen(config.port, () => console.log(`[Server thread/INFO] Static files from '${config.webdir}' hosting started on port ${config.port}`));