import Store from './Store.js';

class UI {
  static displayBooks() {
    const books = Store.getBooks();
    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector('#book-list');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td>
          <button class="delete-button">
            <i class="fa fa-trash"></i>
          </button>
        </td>
      `;
    list.appendChild(row);
  }

  static deleteBook(element) {
    if (element.classList.contains('delete-button')) {
      element.closest('tr').remove();
    }
  }

  static showAlert(message, className, sectionId) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const section = document.querySelector(`#${sectionId}`);
    section.insertBefore(div, section.firstChild);
    setTimeout(() => div.remove(), 4000);
  }

  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
  }
}

module.exports = UI;
