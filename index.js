import Store from './store.js';
import Book from './book.js';

document.addEventListener("DOMContentLoaded", (event) => {
    let myStore = new Store();
    myStore.showTable();

    // Add Book
    document.querySelector("#my-form").addEventListener("submit", (event) => {
        event.preventDefault();
        
        let jsonObj = JSON.parse(localStorage.getItem("myBooks")).filter((elem) => elem != null);
        
        // Form values
        let bookTitle = document.querySelector("#title").value;
        let authorName = document.querySelector("#author").value;
        let isbnValue = document.querySelector("#ISBN").value;

        let newBook = new Book(bookTitle, authorName, isbnValue);
        jsonObj[jsonObj.length] = newBook;
        localStorage.setItem("myBooks", JSON.stringify(jsonObj));

        Store.createRow(newBook.title, newBook.author, newBook.isbn);
        
        // For newly created rows, add eventListeners to delete and edit button
        let newDeleteButton = document.querySelectorAll(".delete")[document.querySelectorAll(".delete").length - 1];
        deleteBook(newDeleteButton);
        let newEditButton = document.querySelectorAll(".edit")[document.querySelectorAll(".edit").length - 1];
        editBook(newEditButton);

        // After adding, disable update button and reset form
        document.querySelector(".update").setAttribute("disabled", "");
        document.querySelector("#my-form").reset();
    });

    // Delete Book
    document.querySelectorAll(".delete").forEach((button) => deleteBook(button));

    function deleteBook(button) {
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
    }

    // Edit Book
    var ind, count, rowToEdit;
    let updateButton = document.querySelector(".update");
    
    // Click on Edit Button
    document.querySelectorAll(".edit").forEach((button) => editBook(button));

    function editBook(button) {
        button.addEventListener("click", (event) => {
            // Taking the row index where edit was clicked
            ind, count = 0;
            rowToEdit = button.closest("tr");

            document.querySelector("button[type=submit]").setAttribute("disabled", "");
            updateButton.removeAttribute("disabled");
            document.querySelectorAll("tr").forEach((row) => {
                if(row === rowToEdit) {
                    ind = count;
                }

                count++;
            });
            
            // Adding row values back in form
            document.querySelector("#title").value = rowToEdit.children[0].innerHTML;
            document.querySelector("#author").value = rowToEdit.children[1].innerHTML;
            document.querySelector("#ISBN").value = rowToEdit.children[2].innerHTML;                
        });
    }

    // Click on Update Button
    updateButton.addEventListener("click", (event) => {
        let jsonObj = JSON.parse(localStorage.getItem("myBooks")).filter((elem) => elem != null);

        let updatedTitle = document.querySelector("#title").value;
        let updatedAuthor = document.querySelector("#author").value;
        let updatedIsbn = document.querySelector("#ISBN").value;
        
        // If trying to update with empty form
        if(updatedTitle == '' || updatedAuthor == '' || updatedIsbn == '') {
            document.querySelector("#my-form").reportValidity();
            return;
        }

        // Inserting updated values from the form back in row (inside td)
        rowToEdit.children[0].innerHTML = updatedTitle;
        rowToEdit.children[1].innerHTML = updatedAuthor;
        rowToEdit.children[2].innerHTML = updatedIsbn;
        
        // Using the row index, updating the object and localStorage
        jsonObj[ind-1].title = updatedTitle;
        jsonObj[ind-1].author = updatedAuthor;
        jsonObj[ind-1].isbn = updatedIsbn;
        localStorage.setItem("myBooks", JSON.stringify(jsonObj));

        // Enabling add button after updating
        document.querySelector("button[type=submit]").removeAttribute("disabled");

        // Disable update button and reset form after updating
        updateButton.setAttribute("disabled", "");
        document.querySelector("#my-form").reset();
    });
});