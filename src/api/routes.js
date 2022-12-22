const addBookHandler = require('./handler.js');

const route = [
    {
        method: 'POST',
        path: '/books',
        handler: addBookHandler,
    },
];

module.exports = route;
