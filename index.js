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
document.querySelector('#book-list-c').addEventListener('click', (e) => {
  UI.deleteBook(e.target);
  Store.removeBook(
    e.target.closest('tr').querySelectorAll('td')[2].textContent,
  );
  UI.showAlert('Book removed', 'success', 'book-list-c');

  setTimeout(() => {
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  }, 3000); // delay the reload by 3 seconds (3000 milliseconds)
});

// Get the book list section
const bookListSection = document.getElementById('book-list-c');

// Hide the other sections
const addBookSection = document.getElementById('add-book-form');
const contactInfoSection = document.getElementById('contact-info');
addBookSection.style.display = 'none';
contactInfoSection.style.display = 'none';

// Add an event listener to each navigation link
document.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent the default link behavior

    // Hide all sections except for the selected one
    switch ((e).target.hash) {
      case '#book-list-c':
        bookListSection.style.display = 'block';
        addBookSection.style.display = 'none';
        contactInfoSection.style.display = 'none';
        break;
      case '#add-book-form':
        bookListSection.style.display = 'none';
        addBookSection.style.display = 'block';
        contactInfoSection.style.display = 'none';
        break;
      case '#contact-info':
        bookListSection.style.display = 'none';
        addBookSection.style.display = 'none';
        contactInfoSection.style.display = 'block';
        break;
    }
  });
});

// Show the book list section by default
bookListSection.style.display = 'block';

const contactForm = document.querySelector('#contact-info form');

// select the form and add a submit event listener
document.querySelector('#contact-info form').addEventListener('submit', (e) => {
  e.preventDefault(); // prevent the default form submission behavior

  // get the input values
  const name = document.querySelector('#name').value;
  const email = document.querySelector('#email').value;
  const message = document.querySelector('#message').value;

  // create a new message object with the input values
  const newMessage = {
    name,
    email,
    message,
    timestamp: new Date().getTime(), // add a timestamp to track when the message was sent
  };

  // get the existing messages from local storage, or initialize an empty array
  // eslint-disable-next-line prefer-const
  let messages = JSON.parse(localStorage.getItem('messages')) || [];

  // add the new message to the array
  messages.push(newMessage);

  // store the updated messages array in local storage
  localStorage.setItem('messages', JSON.stringify(messages));

  // show a success message to the user
  UI.showAlert('Message sent', 'success', 'contact-info');

  // reset the form inputs
  e.target.reset();
});