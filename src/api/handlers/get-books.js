const books = require('../../books');

const getAllBooksHandler = () => ({
    status: 'success',
    data: {
        books,
    },
});

const getBookByIdHandler = (request, h) => {
    const {bookId} = request.params;

    const book = books.filter((b) => b.id === bookId)[0];

    if (book) {
        return {
            status: 'success',
            data: {
                book,
            },
        };
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
    });

    response.code(404);
    return response;
};

module.exports = {getAllBooksHandler, getBookByIdHandler};
