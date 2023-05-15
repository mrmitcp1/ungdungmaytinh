const http = require('http');
const fs = require('fs');
const qs = require('qs')

const server = http.createServer(function (req, res) {
    if (req.method === 'GET') {
        fs.readFile('./views/caculator.html', function (err, data) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            return res.end();
        });
    } else {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        })
        req.on('end', () => {
            const calculator = qs.parse(data);
            let ketQuaString = calculator.number1 + calculator.operator + calculator.number2;
            console.log(ketQuaString);
            console.log(calculator)
            fs.readFile('./views/result.html', 'utf8', function (err, datahtml) {
                if (err) {
                    console.log(err);
                }
                let result  = eval(ketQuaString)
                console.log(eval(result))
                datahtml = datahtml.replace('{result}',result)
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(datahtml);
                return res.end();
            });
        })
        req.on('error', () => {
            console.log('error')
        })
    }
});

server.listen(8080, function () {
    console.log('server running at localhost:8080 ')
});