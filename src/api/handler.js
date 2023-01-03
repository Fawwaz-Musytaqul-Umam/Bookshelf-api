const {nanoid} = require('nanoid');
const books = require('../data/books');

class Handler {
    // Insert New Book
    static addBook(request, h) {
        const {name, year, author, summary, publisher, pageCount, readPage, reading} = request.payload;

        if (!name) {
            return response(h, {
                status: 'fail',
                message: 'Gagal menambahkan buku. Mohon isi nama buku',
                statusCode: 400,
            });
        }

        if (readPage > pageCount) {
            return response(h, {
                status: 'fail',
                message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
                statusCode: 400,
            });
        }

        const id = nanoid(15);
        const finished = readPage === pageCount;
        const insertedAt = new Date().toISOString();
        const updatedAt = insertedAt;

        const newBook = {
            id,
            finished,
            insertedAt,
            updatedAt,
            name,
            year,
            author,
            summary,
            publisher,
            readPage,
            pageCount,
            reading,
        };
        books.unshift(newBook);

        const isSuccess = books.filter((book) => book.id === id).length > 0;

        if (isSuccess) {
            return response(h, {
                status: 'success',
                statusCode: 201,
                message: 'Buku berhasil ditambahkan',
                data: {
                    bookId: id,
                },
            });
        }

        return response(h, {
            status: 'error',
            statusCode: 500,
            message: 'Buku gagal ditambahkan',
        });
    }

    // Get ALl Books
    static getAllBooks(request, h) {
        const {name, reading, finished} = request.query;

        const data = [];

        if (name) {
            for (const book of books) {
                if (book.name.toLowerCase().includes(name.toLowerCase())) {
                    data.unshift({
                        id: book.id,
                        name: book.name,
                        publisher: book.publisher,
                    });
                }
            }

            if (data.length > 0) {
                return {status: 'success', data: {books: data}};
            }

            return response(h, {
                status: 'fail',
                statusCode: 404,
                message: 'Buku tidak ditemukan',
            });
        }

        if (reading) {
            let isReading = false;
            if (reading == 1) isReading = true;

            for (const book of books) {
                if (book.reading === isReading) {
                    data.unshift({
                        id: book.id,
                        name: book.name,
                        publisher: book.publisher,
                    });
                }
            }

            if (data.length > 0) {
                return {status: 'success', data: {books: data}};
            }

            return response(h, {
                status: 'fail',
                statusCode: 404,
                message: 'Buku tidak ditemukan',
            });
        }

        if (finished) {
            let isFinished = false;
            if (finished == 1) isFinished = true;

            for (const book of books) {
                if (book.finished === isFinished) {
                    data.unshift({
                        id: book.id,
                        name: book.name,
                        publisher: book.publisher,
                    });
                }
            }

            if (data.length > 0) {
                return {status: 'success', data: {books: data}};
            }

            return response(h, {
                status: 'fail',
                statusCode: 404,
                message: 'Buku tidak ditemukan',
            });
        }

        for (const book of books) {
            data.unshift({
                id: book.id,
                name: book.name,
                publisher: book.publisher,
            });
        }

        return {status: 'success', data: {books: data}};
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
        }

        return response(h, {
            status: 'fail',
            statusCode: 404,
            message: 'Gagal memperbarui buku. Id tidak ditemukan',
        });
    }

    // Delete Book
    static deleteBook(requset, h) {
        const {bookId} = requset.params;

        const index = books.findIndex((book) => book.id == bookId);

        if (index !== -1) {
            books.splice(index, 1);
            return response(h, {
                status: 'success',
                statusCode: 200,
                message: 'Buku berhasil dihapus',
            });
        }

        return response(h, {
            status: 'fail',
            statusCode: 404,
            message: 'Buku gagal dihapus. Id tidak ditemukan',
        });
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
