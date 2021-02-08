const jwt = require('jsonwebtoken');

module.exports = (token) => {
    return new Promise((resolve) => {
        jwt.verify(token, 'CHANGEME', (err, decoded) => {
            if(err) {
                resolve(false);
            }
            console.log(decoded);
            resolve(decoded);
        });
    })
}