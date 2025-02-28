import { describe, it, expect, beforeEach } from '@jest/globals';
import { BookService } from './bookService';

describe('BookService', () => {
    let bookService: BookService;

    beforeEach(() => {
        bookService = new BookService();
    });

    it('should return all books', () => {
        const books = bookService.getBooks();
        expect(books.length).toBe(5);
    });

    it('should return book by id', () => {
        const book = bookService.getBookById(1);
        expect(book).toBeDefined();
        expect(book?.title).toBe("The Devil's Advocate");
    });

    it('should return undefined for non-existent book id', () => {
        const book = bookService.getBookById(99);
        expect(book).toBeUndefined();
    });

    it('should return all authors', () => {
        const authors = bookService.getAuthors();
        expect(authors.length).toBe(5);
    });

    it('should return author by id', () => {
        const author = bookService.getAuthorById(1);
        expect(author).toBeDefined();
        expect(author?.name).toBe("Serhiy Zhadan");
    });

    it('should return undefined for non-existent author id', () => {
        const author = bookService.getAuthorById(99);
        expect(author).toBeUndefined();
    });

    it('should return books by author id', () => {
        const books = bookService.getBooksByAuthor(3);
        expect(books.length).toBe(1);
        expect(books[0].title).toBe("Fahrenheit 451");
    });

    it('should return books by author name', () => {
        const books = bookService.getBooksByAuthor("Ray Bradbury");
        expect(books.length).toBe(1);
        expect(books[0].title).toBe("Fahrenheit 451");
    });

    it('should return empty array for non-existent author', () => {
        const books = bookService.getBooksByAuthor("Unknown Author");
        expect(books.length).toBe(0);
    });

    it('should return author by book id', () => {
        const author = bookService.getAuthorByBookId(3);
        expect(author).toBeDefined();
        expect(author?.name).toBe("Ray Bradbury");
    });

    it('should return undefined for non-existent book id when getting author', () => {
        const author = bookService.getAuthorByBookId(99);
        expect(author).toBeUndefined();
    });

    it('should return books matching search query', () => {
        const books = bookService.search("Dystopian");
        expect(books.length).toBe(2);
    });

    it('should return books by partial title match', () => {
        const books = bookService.search("Fahrenheit");
        expect(books.length).toBe(1);
        expect(books[0].title).toBe("Fahrenheit 451");
    });

    it('should return books by publication year', () => {
        const books = bookService.search("2008");
        expect(books.length).toBe(1);
        expect(books[0].title).toBe("The Hunger Games");
    });

    it('should return books by author name match in search', () => {
        const books = bookService.search("Ray Bradbury");
        expect(books.length).toBe(1);
        expect(books[0].title).toBe("Fahrenheit 451");
    });

    it('should return empty array for unmatched search', () => {
        const books = bookService.search("Unknown");
        expect(books.length).toBe(0);
    });
});
