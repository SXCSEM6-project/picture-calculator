const http = require("http")
const fs = require("fs")
const pyshell = require("python-shell")


const server = http.createServer(function (request, response) {
    var post='';
    if(request.url == "/"){
        const data = fs.readFileSync("canvas.html","utf-8")
        response.end(data)
    }
    //main
    if (request.method == 'POST' && request.url=="/convert") {
        var body = '';
        request.on('data', function (data) {
            body += data;
        });
        request.on('end', function () {
//-------------parsing data from json to string-------------------------
            post = JSON.parse(body);
            var data = post.replace(/^data:image\/\w+;base64,/, "");
            var buf = Buffer.from(data, 'base64');
            writeFileToSystem(buf);
        });
    }

//----------saving image to server side folder------------------
    function writeFileToSystem(buf)
    {
        fs.writeFile("images/image.png", buf, function(err) {
            if(err)
                console.log(err);
            runScript()
        });
    }
    function runScript(){
        pyshell.PythonShell.run("segri.py", null, function(err, result){
            if(!err){
                console.log("script ran successfully...")
                console.log(result)
            }
            else
                console.log(err);
        })
    }
})

server.listen(8000,"127.0.0.1",()=>{
    console.log("listening to 8000")
})
