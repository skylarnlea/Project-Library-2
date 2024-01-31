function findAuthorById(authors, id) {
  return authors.find((author) => authors.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  const booksBorrowed = books.filter((book) => book.borrows[0] && !book.borrows[0].returned);
  const booksReturned = books.filter((book) => book.borrows[0] && book.borrows[0].returned);
  return [booksBorrowed, booksReturned];
}

function getBorrowersForBook(book, accounts) {
  const borrowers = book.borrows.map(borrow => {
    const account = accounts.find(account => account.id === borrow.id);
    return { ...account, returned: borrow.returned };
    })
    .slice(0, 10);
  return borrowers;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
