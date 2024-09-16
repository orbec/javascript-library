const myLibrary = [];

const showButton = document.getElementById("showDialog");
const favDialog = document.getElementById("new-book-dialog");
const confirmBtn = favDialog.querySelector("#confirmBtn");
const cancelBtn = favDialog.querySelector("#cancelBtn");


class Book {
    constructor(title, author, pages, read){

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.isRead = function(){
        return this.read === 1 ? "read" : "not read yet"
    }
    this.info = function(){
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.isRead()}`;

    }

    }
}

/*
function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.isRead = function(){
        return this.read === 1 ? "read" : "not read yet"
    }
    this.info = function(){
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.isRead()}`;

    }

    
}
*/

function displayLibrary(){

    const booklist = document.querySelector(".book-list-container");
    if (booklist.childElementCount > 0) {
        booklist.replaceChildren();
    }
    myLibrary.forEach(function(book, index){
        console.log(book.info());
        const row = document.createElement("div");
        row.className= "card";
        row.setAttribute("id", index)
        const bookContainer = document.createElement("p");
        const text = `<b>${book.title}</b> <i> by ${book.author}</i>, ${book.pages} pages.<br/> ${book.isRead()}.`;
        bookContainer.innerHTML = text;

        const buttonContainer = document.createElement("div");
        buttonContainer.className = "book-buttons";
        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-book";
        deleteButton.onclick = function(){
            const list = document.querySelector(".book-list-container");
            const id = this.parentElement.parentElement.getAttribute("id");
            const child = document.getElementById(id);
            list.removeChild(child);
            myLibrary.splice(id,1);
        };
        const toggleRead = document.createElement("button");
        toggleRead.className = "toogle-read";
        toggleRead.style.backgroundImage =  book.read === 1 ? "url('./icons/eye-minus.svg')": "url('./icons/eye-plus.svg')";
        toggleRead.onclick = function(){
            book.read = book.read === 1 ? 0 : 1;
            displayLibrary();
        }

        buttonContainer.appendChild(toggleRead);
        buttonContainer.appendChild(deleteButton);
        row.appendChild(bookContainer);
        row.appendChild(buttonContainer);
        

        
        booklist.appendChild(row);
        
    } );
}

function addBooktoLibrary(form){

    const title = form.querySelector("#title").value;
    const author = form.querySelector("#author").value;
    const pages = form.querySelector("#pages").value;
    const read = form.querySelector("#read").checked === true ? 1 : 0;
    const newBook = new Book(title,author,pages,read);
    myLibrary.push(newBook);
    displayLibrary();
    form.querySelector("#title").value = "";
    form.querySelector("#author").value = "";
    form.querySelector("#pages").value = "";
    form.querySelector("#read").checked = false;

}

// "Show the dialog" button opens the <dialog> modally
showButton.addEventListener("click", () => {
  favDialog.showModal();
});

// Prevent the "confirm" button from the default behavior of submitting the form, and close the dialog with the `close()` method, which triggers the "close" event.
confirmBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const form = event.target.parentElement.parentElement;
  if (form.checkValidity()){
    addBooktoLibrary(form);
    favDialog.close();
  }else{
    form.reportValidity();
  }
});

cancelBtn.addEventListener("click", (event) => {
    favDialog.close();
})








