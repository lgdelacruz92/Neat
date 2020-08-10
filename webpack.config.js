const path = require('path');

module.exports = {
    target: 'web',
    entry: './main.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'neatty',
        libraryTarget: 'var'
    },
};