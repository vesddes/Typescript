var BookService = /** @class */ (function () {
    function BookService() {
        this.books = [
            { id: 1, title: "The Devil's Advocate", genre: "Thriller", publicationYear: 2014, authorId: 1 },
            { id: 2, title: "The Night Manager", genre: "Thriller", publicationYear: 1993, authorId: 2 },
            { id: 3, title: "Fahrenheit 451", genre: "Dystopian", publicationYear: 1953, authorId: 3 },
            { id: 4, title: "Big Little Lies", genre: "Mystery", publicationYear: 2014, authorId: 4 },
            { id: 5, title: "The Hunger Games", genre: "Dystopian", publicationYear: 2008, authorId: 5 }
        ];
        this.authors = [
            { id: 1, name: "Serhiy Zhadan", birthYear: 1974, books: [] },
            { id: 2, name: "John le Carré", birthYear: 1931, books: [] },
            { id: 3, name: "Ray Bradbury", birthYear: 1920, books: [] },
            { id: 4, name: "Liane Moriarty", birthYear: 1966, books: [] },
            { id: 5, name: "Suzanne Collins", birthYear: 1962, books: [] },
        ];
    }
    BookService.prototype.getBooks = function () {
        return this.books;
    };
    BookService.prototype.getBookById = function (id) {
        var book = this.books.find(function (book) { return book.id === id; });
        if (!book) {
            console.log("Book with id ".concat(id, " not found."));
        }
        return book;
    };
    BookService.prototype.getAuthors = function () {
        return this.authors;
    };
    BookService.prototype.getAuthorById = function (id) {
        var author = this.authors.find(function (author) { return author.id === id; });
        if (!author) {
            console.log("Author with id ".concat(id, " not found."));
        }
        return author;
    };
    BookService.prototype.getBooksByAuthor = function (authorIdOrName) {
        if (typeof authorIdOrName === "number") {
            return this.books.filter(function (book) { return book.authorId === authorIdOrName; });
        }
        var author = this.authors.find(function (a) { return a.name === authorIdOrName; });
        return author ? this.books.filter(function (book) { return book.authorId === author.id; }) : [];
    };
    BookService.prototype.getAuthorByBookId = function (bookId) {
        var book = this.getBookById(bookId);
        return book ? this.getAuthorById(book.authorId) : undefined;
    };
    BookService.prototype.search = function (query) {
        var _this = this;
        var lowercaseQuery = query.toLowerCase();
        return this.books.filter(function (book) {
            var _a;
            return book.title.toLowerCase().includes(lowercaseQuery) ||
                book.genre.toLowerCase().includes(lowercaseQuery) ||
                book.publicationYear.toString().includes(query) ||
                ((_a = _this.getAuthorById(book.authorId)) === null || _a === void 0 ? void 0 : _a.name.toLowerCase().includes(lowercaseQuery));
        });
    };
    return BookService;
}());
var bookService = new BookService();
console.log(bookService.getBooks());
console.log(bookService.getBookById(1));
console.log(bookService.getAuthors());
console.log(bookService.getBooksByAuthor("Serhiy Zhadan"));
console.log(bookService.search("Dystopian"));
