
import * as fs from 'fs';
import * as path from 'path';
import * as http from 'http';

const HTTP_PORT = 8181;

const httpServer = http.createServer(function (req, res) {
    console.log(req.url);
    switch (req.url) {
        case "/led_status":
                console.log('Get red diode status');
                const status = parseInt(fs.readFileSync('/sys/class/leds/led1/brightness', {encoding:'utf8', flag:'r'}), 10);
                res.writeHead(200);
                res.end(JSON.stringify({status}));
            break;
        case "/led_off":
                console.log('Disable red diode');
                fs.writeFileSync('/sys/class/leds/led1/brightness', '0');
                req.url = "/";
             break;
        case "/led_on":
                console.log('Enable red diode');
                fs.writeFileSync('/sys/class/leds/led1/brightness', '1');
                req.url = "/";
             break;
        default:
        break;
    }

    const __dirname = path.resolve(path.dirname(''));
    const file_path = __dirname + (req.url === '/' ? '/index.html' : req.url);

    fs.readFile(file_path, function (err, data) {
        if (err) {
            res.writeHead(404);
            res.end(JSON.stringify(err));
            return;
        }
        res.writeHead(200);
        res.end(data);
    });

});

httpServer.listen(HTTP_PORT);
console.log(`Server started on ${HTTP_PORT} PORT`);

