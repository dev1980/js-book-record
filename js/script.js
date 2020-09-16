console.log('This is index.js');
// Todos"
// 1. Store all the data to the localStorage
// 2. Give another column as an option to delete the book
// 3. Add a scroll bar to the view

// Constructor
function Book(name, author, pages, type) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.type = type;
}

// Display Constructor
function Display() {

}

// Add methods to display prototype
Display.prototype.add = function (book) {
  console.log('Adding to UI');
  const tableBody = document.getElementById('tableBody');
  const uiString = `<tr>
                        <td>${book.name}</td>
                        <td>${book.author}</td>
                        <td>${book.pages}</td>
                        <td>${book.type}</td>
                    </tr>`;
  tableBody.innerHTML += uiString;
};

// Implement the clear function
Display.prototype.clear = function () {
  const libraryForm = document.getElementById('libraryForm');
  libraryForm.reset();
};

// Implement the validate function
Display.prototype.validate = function (book) {
  if (book.name.length < 2 || book.author.length < 2) {
    return false;
  }

  return true;
};
Display.prototype.show = function (mess, displayMessage) {
  const message = document.getElementById('message');
  message.innerHTML = `<div class="alert alert-${mess} alert-dismissible fade show" role="alert">
                            <strong>Messge:</strong> ${displayMessage}
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">×</span>
                            </button>
                        </div>`;
  setTimeout(() => {
    message.innerHTML = '';
  }, 2000);
};


// Add submit event listener to libraryForm
const llibraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
  console.log('YOu have submitted library form');
  const name = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  let type;
  const fiction = document.getElementById('fiction');
  const programming = document.getElementById('programming');
  const cooking = document.getElementById('cooking');

  if (fiction.checked) {
    type = fiction.value;
  } else if (programming.checked) {
    type = programming.value;
  } else if (cooking.checked) {
    type = cooking.value;
  }

  const book = new Book(name, author, pages, type);
  console.log(book);

  const display = new Display();

  if (display.validate(book)) {
    display.add(book);
    display.clear();
    display.show('success', 'Your book has been successfully added');
  } else {
    // Show error to the user
    display.show('danger', 'Sorry you cannot add this book');
  }

  e.preventDefault();
}
