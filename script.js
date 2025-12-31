//html references
const myLibrary = [];
const shelf = document.querySelector(".shelf");
const addBook = document.querySelector(".add");
const dialog = document.querySelector("dialog");
const submitBook = document.querySelector(".submit");
const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");

//delete button references

function Book(title, author, pages, read) {
    this.title = title
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
}



//event listeners

addBook.addEventListener("click", () => {
    dialog.showModal();
    dialog.style.display = "grid";
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
        booksOnShelf += `<div class="bookCard">
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
        </div>
        `;
 
    }
shelf.innerHTML = booksOnShelf;

const deleteButtons = document.querySelectorAll(".deleteBtn");

deleteButtons.forEach((button) => {
    
    button.addEventListener("click", () => {
        deleteBook(button.dataset.id)});
        
});

}

function submitBookForm(event) {
    if(title.value != "" && author.value != "" && pages.value != "") {
        addBookToLibrary(title.value, author.value,pages.value);
    updateShelf();
    }
    else {
        alert("Please fill out all fields.")
    }
    title.value = "";
    author.value = "";
    pages.value = "";
    dialog.close();
    dialog.style.display = "none";
}


addBookToLibrary("The Lightening Thief", "Rick Riordan", 377, true);
addBookToLibrary("Porky", "Donald Duck", 156, true);
addBookToLibrary("Porky", "Donald Duck", 156, true);
addBookToLibrary("Porky", "Donald Duck", 156, true);
addBookToLibrary("Porky", "Donald Duck", 156, true);

updateShelf();
