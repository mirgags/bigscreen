var fs = require('fs');
var http = require('http');
var url = require('url');
var imgList, imgServe;

function imageCycle (fileNum) {
    var indexNum = fileNum;
    imgList = fs.readdirSync('./images');
    console.log('in imageCycle');
    if(indexNum >= imgList.length - 1) {
        return 0;
    }
    else {
        return indexNum + 1;
    };
};

function imageLibrary () {

};

http.createServer(function (req, res) {
    if(url.parse(req.url).pathname === '/') {
        res.writeHead(200,{'Content-Type': 'text/javascript'});
        res.end(fs.readFileSync('./carousel.js'));
    };
    if(url.parse(req.url).pathname === '/blah') {
        var theHtml = '<!DOCTYPE html><html><head><script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script></head><body>';
        res.writeHead(200,{'Content-Type': 'text/html'});
        imgList = fs.readdirSync('./images');
        for(i=0;i<imgList.length;i++) {
            imgServe = fs.readFileSync('./images/' + imgList[i]);
            theHtml += '<div><img class="img" id="img'+i+'" src="images?image='+imgList[i]+'" ';
            if(i !== 0) {
                theHtml += 'style="display: collapse;"';
            };
            theHtml += '/></div>'
        };
        theHtml += '<script src="/">';
//        theHtml += 'function carousel() {$.get(\'http://127.0.0.1:8001\', function(data) {$(\'div.img\').append(data);});};window.setInterval(carousel, 5000);';
        theHtml += '</script></body></html>';
//        console.log(theHtml);
        res.end(theHtml);
    };
    if(url.parse(req.url).pathname === '/images') {
        res.writeHead(200,{'Content-Type': 'image/jpeg'});
        console.log(url.parse(req.url).query.split('=')[1]);
        imgServe = fs.readFileSync('./images/' + url.parse(req.url).query.split('=')[1]);
        res.end(imgServe, 'binary');
    };
}).listen(8002, '127.0.0.1');

console.log('You got the server running on localhost, fishbulb.');
