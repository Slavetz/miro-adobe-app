const request = require('request-promise');
const config = require('./config.js');

module.exports.getToken = function(code, clientId) {

        const options = {
            method: 'POST',
            uri: `${config.API_BASE}/oauth/token`,
            qs: {
                grant_type: 'authorization_code',
                client_id: clientId,
                client_secret: config.CLIENT_SECRET,
                code: code,
                redirect_uri: config.REDIRECT_URI
            }
        };

        return request(options)
            .then(res => JSON.parse(res))
            .catch(err => {
                console.log(options);
                console.log(err);
            });

};