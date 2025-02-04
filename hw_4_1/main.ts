interface IBook {
    id: number;
    title: string;
    genre: string;
    publicationYear: number;
    authorId: number;
}

interface IAuthor {
    id: number;
    name: string;
    birthYear: number;
    books: IBook[];
}

interface IBookService {
    getBooks(): IBook[];
    getBookById(id: number): IBook | undefined;
    getAuthors(): IAuthor[];
    getAuthorById(id: number): IAuthor | undefined;
    getBooksByAuthor(authorIdOrName: string | number): IBook[];
    getAuthorByBookId(bookId: number): IAuthor | undefined;
    search(query: string): IBook[];
}

class BookService implements IBookService {
    private books: IBook[] = [
        {id: 1, title: "The Devil's Advocate", genre: "Thriller", publicationYear: 2014, authorId: 1 },
        {id: 2, title: "The Night Manager", genre: "Thriller", publicationYear: 1993, authorId: 2 },
        {id: 3, title: "Fahrenheit 451", genre: "Dystopian", publicationYear: 1953, authorId: 3 },
        {id: 4, title: "Big Little Lies", genre: "Mystery", publicationYear: 2014, authorId: 4},
        {id: 5, title: "The Hunger Games", genre: "Dystopian", publicationYear: 2008, authorId: 5}
    ];

    private authors: IAuthor[] = [
        {id: 1, name: "Serhiy Zhadan", birthYear: 1974, books: [] },
        {id: 2, name: "John le Carré", birthYear: 1931, books: [] },
        {id: 3, name: "Ray Bradbury", birthYear: 1920, books: [] },
        {id: 4, name: "Liane Moriarty", birthYear: 1966, books: []},
        {id: 5, name: "Suzanne Collins", birthYear: 1962, books: [] },
    ];

    getBooks(): IBook[] {
        return this.books;
    }

    getBookById(id: number): IBook | undefined {
        const book = this.books.find(book => book.id === id);
        if (!book) {
            console.log(`Book with id ${id} not found.`);
        }
        return book;
    }

    getAuthors(): IAuthor[] {
        return this.authors;
    }

    getAuthorById(id: number): IAuthor | undefined {
        const author = this.authors.find(author => author.id === id);
        if (!author) {
            console.log(`Author with id ${id} not found.`);
        }
        return author;
    }

    getBooksByAuthor(authorIdOrName: string | number): IBook[] {
        if (typeof authorIdOrName === "number") {
            return this.books.filter(book => book.authorId === authorIdOrName);
        }
        const author = this.authors.find(a => a.name === authorIdOrName);
        return author ? this.books.filter(book => book.authorId === author.id) : [];
    }

    getAuthorByBookId(bookId: number): IAuthor | undefined {
        const book = this.getBookById(bookId);
        return book ? this.getAuthorById(book.authorId) : undefined;
    }

    search(query: string): IBook[] {
        const lowercaseQuery = query.toLowerCase();
        return this.books.filter(book =>
            book.title.toLowerCase().includes(lowercaseQuery) ||
            book.genre.toLowerCase().includes(lowercaseQuery) ||
            book.publicationYear.toString().includes(query) ||
            this.getAuthorById(book.authorId)?.name.toLowerCase().includes(lowercaseQuery)
        );
    }
}

const bookService = new BookService();
console.log(bookService.getBooks());
console.log(bookService.getBookById(1));
console.log(bookService.getAuthors());
console.log(bookService.getBooksByAuthor("Serhiy Zhadan"));
console.log(bookService.search("Dystopian"));
