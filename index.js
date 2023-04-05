/* eslint-disable no-unused-vars */
/* eslint-disable default-case */
/* eslint-disable max-classes-per-file */

import Store from './modules/Store.js';
import Book from './modules/Book.js';
import UI from './modules/UI.js';

// Display existing books when the page loads
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Add a book when the form is submitted
document.querySelector('#book-form').addEventListener('submit', (e) => {
  e.preventDefault();

  // Get form values
  const title = document.querySelector('#title').value.trim();
  const author = document.querySelector('#author').value.trim();
  const isbn = document.querySelector('#isbn').value.trim();

  // Validate form inputs
  if (title === '' || author === '' || isbn === '') {
    UI.showAlert('Please fill in all fields', 'danger', 'book-form');
    return;
  }

  // Create a new book object
  const book = new Book(title, author, isbn);

  // Add the book to the UI and storage
  UI.addBookToList(book);
  Store.addBook(book);

  // Show success message and clear form fields
  UI.showAlert('Book added', 'success', 'book-form');
  UI.clearFields();
});

// Remove a book when the delete button is clicked
document.querySelector('#book-list').addEventListener('click', (e) => {
  UI.deleteBook(e.target);
  const isbn = e.target.parentElement.previousElementSibling.textContent;
  Store.removeBook(isbn);
  UI.showAlert('Book removed', 'success', 'book-list');
});