// retrieves token and saves to clipboard

const axios = require('axios');
const util = require('util');
const baseUrl = 'http://localhost:5000/zensocial-501c5/us-central1'
const email = 'avery@fbi.gov';
const password = '123456';

axios.post(`${baseUrl}/api/login`, {
    "email":email,
    "password":password
})
    .then(res => {
        require('child_process').spawn('clip').stdin.end(util.inspect(res.data.token)
            .replaceAll("'", ""));
        console.info("Token copied to clipboard");
    })
