if (process.env.NODE_ENV === 'development') {
    module.exports.apiURL = 'http://localhost:3100';
} else {
    module.exports.apiURL = 'https://api.jetmix.su';
}
