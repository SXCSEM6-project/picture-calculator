require("dotenv").config();

const http = require("http")
const fs = require("fs")
const pyshell = require("python-shell")
const fsp = require("fs").promises
const path = require("path")
const p = "images/"
const port = process.env.PORT
const host = process.env.HOST



const imgSz = 64
const { Image, createCanvas } = require('canvas');
const canvas = createCanvas(imgSz, imgSz);
const ctx = canvas.getContext('2d');

async function loadLocalImage(filename) {
    try {
        var img = new Image()
        img.onload = () => ctx.drawImage(img, 0, 0);
        img.onerror = err => { throw err };
        img.src = filename;
    } catch (err) {
        console.log(err);
    }
}


const server = http.createServer(server_func);

function server_func(request, response) {
    let post = '';

    // Index
    if (request.url == "/") {
        const data = fs.readFileSync("web/index.html", "utf-8")
        response.end(data)
    }
    if (request.url == "/home.css") {
        const data = fs.readFileSync("styles/home.css", "utf-8")
        response.writeHead(200, { 'Content-type': 'text/css' });
        response.end(data)
    }
    if (request.url == '/home.js') {
        const data = fs.readFileSync("client/home.js", "utf-8")
        response.writeHead(200, { 'Content-type': 'text/javascript' });
        response.end(data)
    }

    // Canvas
    if (request.url == "/draw") {
        const data = fs.readFileSync("web/canvas.html", "utf-8")
        response.writeHead(200, { 'Content-type': 'text/html' });
        response.end(data)
    }
    if (request.url == "/canvas.css") {
        const data = fs.readFileSync("styles/canvas.css", "utf-8")
        response.writeHead(200, { 'Content-type': 'text/css' });
        response.end(data)
    }
    if (request.url == '/canvas.js') {
        const data = fs.readFileSync("client/canvas.js", "utf-8")
        response.writeHead(200, { 'Content-type': 'text/javascript' });
        response.end(data)
    }

    // Video
    if (request.url == "/snap") {
        const data = fs.readFileSync("web/vdo.html", "utf-8")
        response.writeHead(200, { 'Content-type': 'text/html' });
        response.end(data)
    }
    if (request.url == "/vdo.css") {
        const data = fs.readFileSync("styles/vdo.css", "utf-8")
        response.writeHead(200, { 'Content-type': 'text/css' });
        response.end(data)
    }
    if (request.url == '/vdo.js') {
        const data = fs.readFileSync("client/vdo.js", "utf-8")
        response.writeHead(200, { 'Content-type': 'text/javascript' });
        response.end(data)
    }
    //about us 
    if (request.url == "/about") {
        const data = fs.readFileSync("web/about.html", "utf-8")
        response.writeHead(200, { 'Content-type': 'text/html' });
        response.end(data)
    }

    // Result Page
    if (request.url == '/res.css') {
        const data = fs.readFileSync("styles/res.css", "utf-8")
        response.writeHead(200, { 'Content-type': 'text/css' });
        response.end(data)
    }

    // Operation JS
    if (request.url == '/operation.js') {
        const data = fs.readFileSync("client/operation.js", "utf-8")
        response.writeHead(200, { 'Content-type': 'text/javascript' });
        response.end(data)
    }

    // Images
    if (request.url == "/home_bg.jpg") {
        const data = fs.readFileSync("res/home_bg.jpg")
        response.writeHead(200, { 'Content-type': 'image/jpg' });
        response.end(data)
    }
    if (request.url == "/calc.jpg") {
        const data = fs.readFileSync("res/calc.jpg")
        response.writeHead(200, { 'Content-type': 'image/jpg' });
        response.end(data)
    }
    if (request.url == "/brush.jpg") {
        const data = fs.readFileSync("res/brush.jpg")
        response.writeHead(200, { 'Content-type': 'image/jpg' });
        response.end(data)
    }
    if (request.url == "/cam.jpg") {
        const data = fs.readFileSync("res/cam.jpg")
        response.writeHead(200, { 'Content-type': 'image/jpg' });
        response.end(data)
    }
    if (request.url == "/snap.png") {
        const data = fs.readFileSync("res/snap.png")
        response.writeHead(200, { 'Content-type': 'image/png' });
        response.end(data)
    }
    if (request.url == "/draw.png") {
        const data = fs.readFileSync("res/draw.png")
        response.writeHead(200, { 'Content-type': 'image/png' });
        response.end(data)
    }
     if (request.url == "/grp.png") {
        const data = fs.readFileSync("res/grp.png")
        response.writeHead(200, { 'Content-type': 'image/png' });
        response.end(data)
    }
    if (request.url == "/ankita.jpg") {
        const data = fs.readFileSync("res/ankita.jpg")
        response.writeHead(200, { 'Content-type': 'image/jpg' });
        response.end(data)
    }
    if (request.url == "/srirup.jpg") {
        const data = fs.readFileSync("res/srirup.jpg")
        response.writeHead(200, { 'Content-type': 'image/jpg' });
        response.end(data)
    }
    if (request.url == "/rhitajyoti.jpg") {
        const data = fs.readFileSync("res/rhitajyoti.jpg")
        response.writeHead(200, { 'Content-type': 'image/jpg' });
        response.end(data)
    }

    // Icon
    if (request.url == '/favicon.ico') {
        const data = fs.readFileSync("favicon.ico")
        response.writeHead(200, { 'Content-type': 'image/ico' });
        response.end(data)
    }

    //main
    if (request.method == 'POST' && request.url == "/convert") {
        let body = '';
        request.on('data', function (data) {
            body += data;
        });
        request.on('end', function () {
            post = JSON.parse(body);
            var data = post.replace(/^data:image\/\w+;base64,/, "");
            var buffer = Buffer.from(data, 'base64');
            writeFileToSystem(buffer)
                .then((flag) => {
                    if (flag)
                        return runScript()
                })
                .then((length) => {
                    console.log("In promise: " + length)
                    getResult(length, response)
                })
                .catch((err) => {
                    console.log(err)
                })
        });

    }
}




function writeFileToSystem(buffer) {
    //deletes previous files
    return new Promise((resolve, reject) => {
        fsp.readdir(p)
            .then((data) => {
                for (i of data) {
                    if (i == ".dummy")
                        continue
                    // console.log(`deleted ${i}`)
                    fsp.unlink(path.join(p, i))
                        .catch((e) => {
                            console.log(e)
                        })
                }
                fs.writeFile(`${p}/image.png`, buffer, {mode: 0o777}, function (err) {
                    if (err)
                        reject(err)
                    resolve(true);
                    //runScript(response)
                });
            })
            .catch((e) => {
                console.log(e)
            })
    })
}


async function runScript() {
    return new Promise((resolve, reject) => {
        pyshell.PythonShell.run("segri.py", null, function (err, result) {
            if (!err) {
                console.log("script ran successfully...")
                console.log("In runscript " + result.length)
                let temp = result[result.length - 1].split(",")
                canvas.height = Number(temp[0])
                canvas.width = Number(temp[1])
                resolve(result.length - 1);
            }
            else
                console.log(err);
            reject(err)
        })
    })
}

async function getResult(n, response) {
    try {
        await loadLocalImage(`${p}image.png`)
        response.write(`<img id="eval_img" src="` + canvas.toDataURL() + '" />\n')
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.height = 64
        canvas.width = 64

        for (i = 0; i < n; i++) {
            await loadLocalImage(`${p}ROI_${i}.png`)
            response.write(`<img id="img${i}" src="` + canvas.toDataURL() + '" />\n')
        }

        response.end()
    } catch (error) {
        console.log(error);
    }
}

server.listen(port, host, () => {
    console.log(`listening to ${host}:${port}`)
})