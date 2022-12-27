const {nanoid} = require('nanoid');
const books = require('../data/books');

class Handler {
    // Insert New Book
    static addBook(request, h) {
        const payload = request.payload;

        const id = nanoid(15);
        const finished = payload.readPage === payload.pageCount;
        const insertedAt = new Date().toISOString();
        const updatedAt = insertedAt;

        const newBook = {id, finished, insertedAt, updatedAt, ...payload};
        books.unshift(newBook);

        const isSuccess = books.filter((book) => book.id === id).length > 0;

        if (!payload.name) {
            return response(h, {
                status: 'fail',
                message: 'Gagal menambahkan buku. Mohon isi nama buku',
                statusCode: 400,
            });
        }

        if (payload.readPage > payload.pageCount) {
            return response(h, {
                status: 'fail',
                message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
                statusCode: 400,
            });
        }

        if (isSuccess) {
            return response(h, {
                status: 'success',
                statusCode: 201,
                message: 'Buku berhasil ditambahkan',
                data: {
                    bookId: id,
                },
            });
        } else {
            return response(h, {message: 'Buku gagal ditambahkan'});
        }
    }

    // Get ALl Books
    static getAllBook() {
        return {status: 'success', data: {books}};
    }

    // Get Book by ID
    static getBook(request, h) {
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

        return response(h, {
            status: 'fail',
            statusCode: 404,
            message: 'Buku tidak ditemukan',
        });
    }

    // Update Book
    static updateBook(request, h) {
        const {bookId} = request.params;

        const {name, year, author, summary, publisher, pageCount, readPage, reading} = request.payload;
        const updatedAt = new Date().toISOString();
        const finished = readPage === pageCount;

        const index = books.findIndex((book) => book.id == bookId);

        if (index === -1) {
            return response(h, {
                status: 'fail',
                statusCode: 404,
                message: 'Gagal memperbarui buku. Id tidak ditemukan',
            });
        }

        if (!name) {
            return response(h, {
                status: 'fail',
                message: 'Gagal memperbarui buku. Mohon isi nama buku',
                statusCode: 400,
            });
        }

        if (readPage > pageCount) {
            return response(h, {
                status: 'fail',
                message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
                statusCode: 400,
            });
        }

        if (index !== -1) {
            books[index] = {
                ...books[index],
                name,
                year,
                author,
                summary,
                publisher,
                pageCount,
                readPage,
                reading,
                updatedAt,
                finished,
            };

            return response(h, {
                status: 'success',
                statusCode: 200,
                message: 'Buku berhasil diperbarui',
            });
        } else {
            return response(h, {message: 'gagal memperbarui buku'});
        }
    }
};

const response = (h, {status = 'error', statusCode = 500, message, data}) => {
    const source = {
        status,
        message,
    };

    if (data) {
        source.data = data;
    }

    return h.response(source).code(statusCode);
};

module.exports = Handler;
