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
        handler: Handler.getAllBooks,
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
    {
        method: 'Delete',
        path: '/books/{bookId}',
        handler: Handler.deleteBook,
    },
];

module.exports = routes;
