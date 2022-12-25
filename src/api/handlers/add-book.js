const {nanoid} = require('nanoid');
const books = require('../../books.js');

const insertBookHandler = (request, h) => {
    const payload = request.payload;

    const id = nanoid(15);
    const finished = payload.readPage === payload.pageCount;
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    const newBook = {id, finished, insertedAt, updatedAt, ...payload};
    books.unshift(newBook);

    const isSuccess = books.filter((book) => book.id === id).length > 0;

    if (!payload.name) {
        return response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
            statusCode: 400,
        });
    }

    if (payload.readPage > payload.pageCount) {
        return response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
            statusCode: 400,
        });
    }

    if (isSuccess) {
        return response({
            status: 'success',
            statusCode: 201,
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: id,
            },
        });
    } else {
        return response({
            message: 'Buku gagal ditambahkan',
        });
    }

    function response({status = 'error', statusCode = 500, message, data}) {
        const source = {
            status,
            message,
        };

        if (data) {
            source.data = data;
        }

        return h.response(source).code(statusCode);
    }
};

module.exports = insertBookHandler;
