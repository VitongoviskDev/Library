const btnSubmit = document.querySelector("#btn-submit");
btnSubmit.addEventListener("click", btnSubmitClicked);

/* INPUT ELEMENTS */
const titleInput = document.querySelector("#book-title");
const authorInput = document.querySelector("#book-author");
const pagesInput = document.querySelector("#book-pages");
const pagesReadedInput = document.querySelector("#book-pages-readed");

/* Elements */
const booksContainer = document.querySelector(".books-container");
const form = document.querySelector("form");
const formBg = document.querySelector(".form-bg");
const bookAmount = document.querySelector(".book-amount");

let library = [];
let editId = -1;

function btnSubmitClicked(){
    //teste
    if(!titleInput.checkValidity() || !authorInput.checkValidity() || !pagesInput.checkValidity() || !pagesReadedInput.checkValidity()){
        return;
    }
    let book = new Book(titleInput.value, authorInput.value, pagesInput.value, pagesReadedInput.value, false, editId == -1 ? GetLastId() + 1 : editId);
    if(editId == -1){
        library.push(book);
    }else{
        for(let i = 0;i<library.length;i++){
            if(library[i].id == book.id){
                library[i] = book;
                console.table(library);
                break;
            }
        }
    }
    UpdateAllBooks();
    HideForm();
}

function ChangeMax(){
    pagesReadedInput.max = pagesInput.value;
}

UpdateAllBooks();

function UpdateAllBooks(){
    let books = booksContainer.childElementCount;
    for(let i= 0; i< books; i++){
        booksContainer.removeChild(booksContainer.lastChild);
    }
    for(let i = 0; i < library.length; i++){
        AddBook(library[i]);
    }

    books = booksContainer.childElementCount;
    bookAmount.innerHTML = `<span>${books}</span> ${books == 1 ? `book` : "books"} registered`;
}
function AddBook(book){
    const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");

        const titleDiv = document.createElement("div");
        titleDiv.classList.add("title");
        titleDiv.innerHTML = `${book.title}`;

        const authorDiv = document.createElement("div");
        authorDiv.classList.add("author");
        authorDiv.innerHTML = `by: ${book.author}`;

        /* READ AMOUNT */
        const readAmountDiv = document.createElement("div");
        readAmountDiv.classList.add("read-amount");

        /* READ AMOUNT - CONTAINER */
        const readAmountContainer = document.createElement("div");
        readAmountContainer.classList.add("read-amount-container");

        const pagesP = document.createElement("p");
        pagesP.textContent = `${book.pagesReaded}/${book.pages} páginas`;

        const percentP = document.createElement("p");
        percentP.textContent = `${book.pecentReaded}%`

        /* READ AMOUNT - PERCENT BAR */
        const percentBarDiv = document.createElement("div");
        percentBarDiv.classList.add("percent-bar");

        const percentFillDiv = document.createElement("div");
        percentFillDiv.classList.add("percent-fill");
        percentFillDiv.style.width = `${book.pecentReaded}%`;


        readAmountContainer.appendChild(pagesP);
        readAmountContainer.appendChild(percentP);
        
        percentBarDiv.appendChild(percentFillDiv);
        
        readAmountDiv.appendChild(readAmountContainer);
        readAmountDiv.appendChild(percentBarDiv);
        /* END READ AMOUNT */

        /* OPTIONS */
        const optionsDiv = document.createElement("div");
        optionsDiv.classList.add("options");

        const favoriteBtn = document.createElement("button");
        const favoriteImg = document.createElement("img");
        favoriteImg.src = book.favorite ? "./images/favorite-checked.png": "./images/favorite.png";
        favoriteImg.id = book.id;
        favoriteBtn.appendChild(favoriteImg);
        favoriteBtn.addEventListener("click", ToggleFavorite);

        const editBtn = document.createElement("button");
        const editImg = document.createElement("img");
        editImg.src = "./images/edit.png";
        editImg.id = book.id;
        editBtn.appendChild(editImg);
        editBtn.addEventListener("click", editBtnClicked);
        
        const deleteBtn = document.createElement("button");
        deleteBtn.id = book.id;
        const deleteImg = document.createElement("img");
        deleteImg.src = "./images/delete.png";
        deleteImg.id = book.id;
        deleteBtn.appendChild(deleteImg);
        deleteBtn.addEventListener("click", deleteBtnClicked);

        optionsDiv.appendChild(favoriteBtn);
        optionsDiv.appendChild(editBtn);
        optionsDiv.appendChild(deleteBtn);
        /* END OPTIONS */

        bookCard.appendChild(titleDiv);
        bookCard.appendChild(authorDiv);
        bookCard.appendChild(readAmountDiv);
        bookCard.appendChild(optionsDiv);

        booksContainer.appendChild(bookCard);
}
function deleteBtnClicked(e){
    DeleteBook(e.target.id);

    UpdateAllBooks();
}
function editBtnClicked(e){
    let book;
    let id = e.target.id;
    for(i = 0; i<library.length;i++){
        if(library[i].id == id)
        book = library[i];
        break;
    }
    ShowForm(book);
}
function DeleteBook(id){
    for(let i = 0; i < library.length; i++){
        if(library[i].id == id){
            library.splice(i, 1);
            break;
        }
    }
}
function UpdateBook(book){
    for(let i = 0; i < library.length; i++){
        if(library[i].id == book.id){
            library[i] = book;
            break;
        }
    }
    UpdateAllBooks();
}


function ShowForm(book){
    if(book){
        editId = book.id;
        titleInput.value = book.title;
        authorInput.value = book.author;
        pagesInput.value = book.pages;
        pagesReadedInput.value = book.pagesReaded; 
    }else{
        editId = -1;
    }
    formBg.classList.add("active");
    form.classList.add("active");
}
function HideForm(){
    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "1";
    pagesReadedInput.value = "0";

    formBg.classList.remove("active");
    form.classList.remove("active");
}
function ToggleFavorite(e){
    let id = e.target.id;
    let book;
    for(let i = 0; i< library.length; i++){
        if(id == library[i].id)
        book = library[i];
        break;
    }
    book.favorite = !book.favorite;
    UpdateBook(book);
}

class Book {

    constructor(title, author, pages, pagesReaded, favorite, id) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.pagesReaded = pagesReaded;
        this.favorite = favorite 
        this.pecentReaded = (pagesReaded * 100 / pages).toFixed(2);
        this.isFavorite = favorite;
        this.id = id;
    }
  
}

function GetLastId() {
    let size = library.length;
    return size == 0 ? 0 : library[size-1].id;
}  