//https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5
const https = require("https");

const options = {
    host: 'api.privatbank.ua',
    path: '/p24api/pubinfo?json&exchange&coursid=5',
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
};
const getJSON = (onResult) =>{
    const req = https.request(options, (res) => {
        let output = '';
        console.log(options.host + ':' + res.statusCode);
        res.setEncoding('utf8');

        res.on('data',  (chunk)=> {
            output += chunk;
        });

        res.on('end', () =>{
            let obj = JSON.parse(output);
            onResult(res.statusCode, obj);
        });
    });
    req.end();
};

module.exports = {
    getJSON
};