let library = [];

function Book(name, author, genre, pages, status) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

function addBookToLibrary(book) {
    library.push(book);
}
