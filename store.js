import Book from "./book.js";

export default class Store {
    constructor() {
        if(!localStorage.getItem("myBooks")) {
            localStorage.setItem("myBooks", "[]");
        }

        let clearLoc = false;
        if(clearLoc) {
            localStorage.removeItem("myBooks");
        }
    }

    showTable() {
        if(localStorage.getItem("myBooks") !== '[]')
        {
            let jsonObj = JSON.parse(localStorage.getItem("myBooks")).filter((elem) => elem != null);

            jsonObj.forEach((book) => {
                Store.createRow(book.title, book.author, book.isbn);
            });
        }

        Book.addBook();
        Book.deleteBook();
        Book.editBook();
    }

    static createRow(title, author, isbn) {
        let tBody = document.querySelector(".table-container table tbody");
        let elem = document.createElement("tr");
        elem.innerHTML = `<tr>
        <td>${title}</td>
        <td>${author}</td>
        <td>${isbn}</td>
        <td><button class="delete">Delete</button><button class="edit">Edit</button></td>
        </tr>`;
        tBody.insertAdjacentElement("beforeend", elem);
    }
}