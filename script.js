//html references
const myLibrary = [];
const shelf = document.querySelector(".shelf");
const addBook = document.querySelector(".add");
const dialog = document.querySelector("dialog");
const submitBook = document.querySelector(".submit");
const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const readFormBox = document.getElementById("read");

//delete button references

class Book {
    constructor(title, author, pages, read) {
        this.title = title
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.id = crypto.randomUUID();
    }

    toggleRead() {
        this.read == true ? this.read = false : this.read = true;
    }
    
}



//event listeners

addBook.addEventListener("click", () => {
    dialog.style.display = "flex";
    dialog.showModal();
    
});

submitBook.addEventListener("click", (event) => {
    submitBookForm();
    event.preventDefault();
});




//functions
function addBookToLibrary(title, author, pages, read) {
  // take params, create a book then store it in the array
  myLibrary.push(new Book(title, author, pages, read));
}

function deleteBook(id) {
    console.log(id);
    let index = 0;
    for(let book of myLibrary) {
        if(book.id == id) {
            myLibrary.splice(index, 1);
            updateShelf();
        }
        index++;
    }
}

function updateShelf() {
    let booksOnShelf = "";
    for (let book of myLibrary) {
        let id = book.id;
        let read = (book.read ? " checked" : "");
        booksOnShelf += `<div class="bookCard` + read + `">
            <div class="title">
                <p> ` + book.title + `</p>
            </div>
            <div class="author">
                <p>` + book.author + `</p>
            </div>
            <div class="pages">
                <p>` + book.pages + `</p>
            </div>
            <div class="delete">
                <input class="deleteBtn" type="button" name="deleteBook" value="Delete" data-id="` + id + `">
            </div>
            <div class="read">
            <p>Read</p>
            <input class="read" type="checkbox" data-id="` + id + `"` + read + `>
            </div>
        </div>
        `;
 
    }
shelf.innerHTML = booksOnShelf;
//update query for delete buttons and read status
const deleteButtons = document.querySelectorAll(".deleteBtn");

const readBox = document.querySelectorAll(".read");
deleteButtons.forEach((button) => {
    
    button.addEventListener("click", () => {
        deleteBook(button.dataset.id)});
        
});

readBox.forEach((box) => {
    box.addEventListener("click", () => {
        toggleRead(box.dataset.id);
        console.log(myLibrary);
    });
});
}

function submitBookForm(event) {
    if(title.value != "" && author.value != "" && pages.value != "") {
        addBookToLibrary(title.value, author.value,pages.value, readFormBox.checked);
    updateShelf();
    }
    else {
        alert("Please fill out all fields.")
    }
    title.value = "";
    author.value = "";
    pages.value = "";
    readFormBox.value = "";
    dialog.close();
    dialog.style.display = "none";
}

function toggleRead(id) {
    for(book of myLibrary) {
        if(book.id == id) {
            book.toggleRead();
        }
    }
    updateShelf();
}

addBookToLibrary("The Lightening Thief", "Rick Riordan", 377, true);


updateShelf();
