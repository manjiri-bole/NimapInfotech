"use strict";
process.env.TZ = 'Asia/Calcutta';
// @DEV: Don't commit dev|stag
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
//process.env.NODE_ENV = process.env.NODE_ENV || 'stag';
// process.env.NODE_ENV = process.env.NODE_ENV || 'prod';
const config = require('./dist/config/config').default;
var BaseController = require('./dist/shared/controller/BaseController');
var compression = require('compression')
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
var cors = require('cors');


const app = express();
app.use(compression());
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
const objBaseController = new BaseController.default(__filename);
app.use('/api/', require('./dist/routes'));


app.use('*', (req, res) => {
    let reqPath = '';
    if ('_parsedOriginalUrl' in req && 'path' in req._parsedOriginalUrl) {
        reqPath = req._parsedOriginalUrl.path;
    }
    //res.error('resource not found 404: ' + reqPath)
    res.status(404).send({
        message: 'Requested resource not found',
    })
});
console.log('config', config);

// const port = 8090;
const port = 3400;
app.set('port', port);


let server = app.listen(port, () => {
    console.log(`NodeServer listening on port: ${port}`)
});
server.timeout = 60000 * 5;

module.exports = app;