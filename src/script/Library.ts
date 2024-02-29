class Library {
  readonly STORAGE_KEY: string;
  books: Book[];

  constructor(key = "library") {
    this.STORAGE_KEY = key;
    this.books = [];
  }

  public get length(): number {
    return this.books.length;
  }

  createBook(title: string, author: string, owned: boolean): Book {
    const newBook: Book = {
      id: crypto.randomUUID(),
      title,
      author,
      owned,
    };

    this.books.push(newBook);
    return newBook;
  }

  retrieveBook(id: string): Book | undefined {
    return this.books.find((foundBook) => id === foundBook.id);
  }

  updateBook({ id, title, author, owned }: Book): Book | undefined {
    const updatedBook = this.retrieveBook(id);
    if (updatedBook) {
      updatedBook.title = title;
      updatedBook.author = author;
      updatedBook.owned = owned;
      return updatedBook;
    }
  }

  deleteBook(id: string) {
    this.books = this.books.filter((book) => book.id !== id);
  }
}

export { Library };
