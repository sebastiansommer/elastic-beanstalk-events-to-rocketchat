const ENV = process.env
if (!ENV.rocketChatWebhookUrl) throw new Error('Missing environment variable: rocketChatWebhookUrl')

const https = require('https');
const util = require('util');
const url = require('url');

exports.handler = function (event, context) {
    var postData = {
        text: event.Records[0].Sns.Message
    };

    var options = {
        method: 'POST',
        hostname: url.parse(ENV.rocketChatWebhookUrl).hostname,
        port: 443,
        path: url.parse(ENV.rocketChatWebhookUrl).path,
    };

    var req = https.request(options, function (res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            context.done(null);
        });
    });

    req.on('error', function (e) {
        console.log('Cant execute request: ' + e.message);
    });

    req.write(util.format('%j', postData));
    req.end();
};