//html references
const myLibrary = [];
const shelf = document.querySelector(".shelf");
const addBook = document.querySelector(".add");
const dialog = document.querySelector("dialog");
const submitBook = document.querySelector(".submit");
const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
function Book(title, author, pages, read) {
    this.title = title
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
}
//functions
function addBookToLibrary(title, author, pages, read) {
  // take params, create a book then store it in the array
  myLibrary.push(new Book(title, author, pages, read));
}


addBookToLibrary("The Lightening Thief", "Rick Riordan", 377, true);
addBookToLibrary("Porky", "Donald Duck", 156, true);
addBookToLibrary("Porky", "Donald Duck", 156, true);
addBookToLibrary("Porky", "Donald Duck", 156, true);
addBookToLibrary("Porky", "Donald Duck", 156, true);

function updateShelf() {
    let booksOnShelf = "";
    for (let book of myLibrary) {
        
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
        </div>
        `;
}
shelf.innerHTML = booksOnShelf;
}


//event listener

addBook.addEventListener("click", () => {
    dialog.showModal();
    dialog.style.display = "grid";
});

submitBook.addEventListener("click", (event) => {
    submitBookForm();
    event.preventDefault();
});

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


updateShelf();