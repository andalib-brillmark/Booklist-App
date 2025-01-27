import Store from "./store.js";

export default class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }

    static addBook() {
        document.querySelector("#my-form").addEventListener("submit", (event) => {
            event.preventDefault();
            
            let jsonObj = JSON.parse(localStorage.getItem("myBooks")).filter((elem) => elem != null);
            let newBook = new Book(document.querySelector("#title").value, document.querySelector("#author").value, document.querySelector("#ISBN").value);
            
            jsonObj[jsonObj.length] = newBook;
            localStorage.setItem("myBooks", JSON.stringify(jsonObj));

            Store.createRow(newBook.title, newBook.author, newBook.isbn);

            document.querySelector(".update").setAttribute("disabled", "");
            document.querySelector("#my-form").reset();

            Book.deleteBook();
            Book.editBook();
        });
    }

    static deleteBook() {
        document.querySelectorAll(".delete").forEach((button) => {
            button.addEventListener("click", (event) => {
                let jsonObj = JSON.parse(localStorage.getItem("myBooks")).filter((elem) => elem != null);
                let bookToDelete = button.closest("tr");
                let ind = 0;
                
                document.querySelectorAll("tr").forEach((row) => {
                    if(row === bookToDelete) {
                        jsonObj.splice(ind-1, 1);
                        localStorage.setItem("myBooks", JSON.stringify(jsonObj));
                    }

                    ind++;
                });

                bookToDelete.remove();
            });
        });
    }

    static editBook() {
        let updateButton = document.querySelector(".update");
        var rowToEdit, ind, count;

        document.querySelectorAll(".edit").forEach((button) => {
            button.addEventListener("click", (event) => {
                ind, count = 0;
                rowToEdit = button.closest("tr");
                updateButton.removeAttribute("disabled");
                document.querySelectorAll("tr").forEach((row) => {
                    if(row === rowToEdit) {
                        ind = count;
                    }

                    count++;
                });
                
                document.querySelector("#title").value = rowToEdit.children[0].innerHTML;
                document.querySelector("#author").value = rowToEdit.children[1].innerHTML;
                document.querySelector("#ISBN").value = rowToEdit.children[2].innerHTML;                
            });
        });

        updateButton.addEventListener("click", (event) => {
            let jsonObj = JSON.parse(localStorage.getItem("myBooks")).filter((elem) => elem != null);
            
            rowToEdit.children[0].innerHTML = document.querySelector("#title").value;
            rowToEdit.children[1].innerHTML = document.querySelector("#author").value;
            rowToEdit.children[2].innerHTML = document.querySelector("#ISBN").value;
            
            jsonObj[ind-1].title = document.querySelector("#title").value;
            jsonObj[ind-1].author = document.querySelector("#author").value;
            jsonObj[ind-1].isbn = document.querySelector("#ISBN").value;

            localStorage.setItem("myBooks", JSON.stringify(jsonObj));

            updateButton.setAttribute("disabled", "");
            document.querySelector("#my-form").reset();
        });
    }
}