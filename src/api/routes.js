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
    {
        method: 'PUT',
        path: '/books/{bookId}',
        handler: Handler.updateBook,
    },
];

module.exports = routes;
