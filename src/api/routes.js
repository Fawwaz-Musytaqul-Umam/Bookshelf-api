const Handler = require('./handler');

const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: Handler.addBook,
    },
    {
        method: 'GET',
        path: '/books',
        handler: Handler.getAllBook,
    },
    {
        method: 'GET',
        path: '/books/{bookId}',
        handler: Handler.getBook,
    },
];

module.exports = routes;
