const request = require('request-promise');
const config = require('./config.js');

module.exports = function(req, res) {
    console.log(req.query);
};