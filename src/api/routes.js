const insertBookHandler = require('./handlers/add-book');
const {getAllBooksHandler, getBookByIdHandler} = require('./handlers/get-books');

const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: insertBookHandler,
    },
    {
        method: 'GET',
        path: '/books',
        handler: getAllBooksHandler,
    },
    {
        method: 'GET',
        path: '/books/{bookId}',
        handler: getBookByIdHandler,
    },
];

module.exports = routes;
