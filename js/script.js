// Define UI
let addBookForm = document.querySelector("#add-book-form");
let bookList = document.querySelector("#book-list");
let addBookSection =  document.querySelector("#add-book-section");

// Define Class

// Book Class
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    };
};

// Book List Class
class BookList {
    static addBook(book) {
        let tr = document.createElement("tr");
        tr.innerHTML = `<td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#">x</a></td>`;
        bookList.appendChild(tr);
    };

    static removeFromBookList(target) {
        if (target.hasAttribute("href")) {
            target.parentElement.parentElement.remove();
            Store.removeBook(target.parentElement.previousElementSibling.textContent.trim());
            this.showAlert("Book deleted!", "alert-failed");
        };
    };  

    static showAlert(message, className) {
        let div = document.createElement("div");
        div.className = className;
        div.innerHTML = `<p>${message}</p>`;
        addBookSection.insertBefore(div, addBookForm);

        setTimeout(() => {
            document.querySelector(`.${className}`).remove()
        }, 3000);
    };
};

// Local Storage Class
class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem("books") === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem("books"));
        };
        return books;
    };

    static addBook(book) {
        let books = this.getBooks();
        books.push(book);
        localStorage.setItem("books", JSON.stringify(books));
    };

    static displayBooks() {
        let books = this.getBooks();
        books.forEach((book) => {
            BookList.addBook(book);
        });
    };

    static removeBook(isbn) {
        let books = this.getBooks();
        books.forEach((book, index) => {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            };
        });
    
        localStorage.setItem("books", JSON.stringify(books));
    };
};

// Define Functions
let createBook = (e) => {
    let title = document.querySelector("#title").value;
    let author = document.querySelector("#author").value;
    let isbn = document.querySelector("#isbn").value;

    let book = new Book(title, author, isbn);
    BookList.addBook(book);
    Store.addBook(book);

    title = document.querySelector("#title").value = "";
    author = document.querySelector("#author").value = "";
    isbn = document.querySelector("#isbn").value = "";
    BookList.showAlert("Book Added Successfully!", "alert-success");

    e.preventDefault();
};

let removeBook = (e) => {
    BookList.removeFromBookList(e.target)
    e.preventDefault();
};

// Define Event Listeners
addBookForm.addEventListener("submit", createBook);
bookList.addEventListener("click", removeBook);
document.addEventListener("DOMContentLoaded", Store.displayBooks());


