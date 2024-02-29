import { Library } from "./Library.js";

const library = new Library();
let currentBookId: string;

function editBook(book: Book) {
  // prettier-ignore
  const editModal = document.getElementById("edit-modal") as HTMLDialogElement;
  currentBookId = book.id;

  // prettier-ignore
  (editModal.querySelector("#book-title") as HTMLFormElement).value = book.title;
  // prettier-ignore
  (editModal.querySelector("#book-author") as HTMLFormElement).value = book.author;
  // prettier-ignore
  (editModal.querySelector("#book-owned") as HTMLFormElement).checked = book.owned;

  editModal.show();
}

function createCard(book: Book): HTMLElement {
  // prettier-ignore
  const cardHTML = '' + 
    `<div class="card w-96 bg-base-100 shadow-xl" data-id="${book.id}">` + 
    '  <div class="card-body">' + 
    `    <h2 class="card-title">${book.title}</h2>` + 
    `    <p>${book.author}</p>` + 
    '    <div class="form-control">' + 
    '      <label class="label cursor-pointer p-0">' + 
    '        <span class="label-text">Own?</span>' + 
    `        <input type="checkbox" class="checkbox" disabled ${book.owned ? "checked" : ""} />` + 
    '      </label>' + 
    '    </div>' + 
    '    <div class="card-actions justify-end pt-2">' + 
    '      <button id="edit-button" class="btn btn-sm btn-circle">📝</button>' + 
    '      <button id="delete-button" class="btn btn-sm btn-circle">❌</button>' + 
    '    </div>' + 
    '  </div>' + 
    '</div>' + 
    '';

  const div = document.createElement("div");
  div.innerHTML = cardHTML;

  (div.querySelector("#delete-button") as HTMLFormElement).addEventListener(
    "click",
    () => {
      library.deleteBook(book.id);
      updateBookGrid();
    }
  );

  (div.querySelector("#edit-button") as HTMLFormElement).addEventListener(
    "click",
    () => {
      editBook(book);
    }
  );

  return div.firstElementChild as HTMLElement;
}

// prettier-ignore
const createModal = document.getElementById( "create-modal") as HTMLDialogElement;
const editModal = document.getElementById("edit-modal") as HTMLDialogElement;
// prettier-ignore
(document.getElementById("create-book-button") as HTMLInputElement).addEventListener("click", () => { createModal.show(); });

// prettier-ignore
(document.getElementById("create-modal-form") as HTMLFormElement).addEventListener("submit", function(event) {
  event.preventDefault();

  // prettier-ignore
  const bookTitle = this.querySelector("#book-title") as HTMLFormElement;
  // prettier-ignore
  const bookAuthor = this.querySelector("#book-author") as HTMLFormElement;
  // prettier-ignore
  const bookOwned = this.querySelector("#book-owned") as HTMLFormElement;

  if (this.checkValidity()) {
    library.createBook(bookTitle.value, bookAuthor.value, bookOwned.checked);
    updateBookGrid();
  }

  bookTitle.value = "";
  bookAuthor.value = "";
  bookOwned.checked = false;

  createModal.close();
});

function updateBookGrid() {
  const bookGrid = document.getElementById("book-grid") as HTMLElement;
  bookGrid.innerHTML = "";
  library.books.forEach((b: Book) => {
    const newCard = createCard(b);
    bookGrid.appendChild(newCard);
  });
}

// prettier-ignore
(document.getElementById("edit-modal-form") as HTMLFormElement).addEventListener("submit", function(event) {
  event.preventDefault();

  // prettier-ignore
  const bookTitle = this.querySelector("#book-title") as HTMLFormElement;
  // prettier-ignore
  const bookAuthor = this.querySelector("#book-author") as HTMLFormElement;
  // prettier-ignore
  const bookOwned = this.querySelector("#book-owned") as HTMLFormElement;

  if (this.checkValidity()) {
    library.updateBook({id: currentBookId, title: bookTitle.value, author: bookAuthor.value, owned: bookOwned.checked});
    updateBookGrid();
  }

  bookTitle.value = "";
  bookAuthor.value = "";
  bookOwned.checked = false;

  editModal.close();
});

window.addEventListener("load", function () {
  updateBookGrid();
});
