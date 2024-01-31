function findAccountById(accounts, id) {
  //use find() method to return an array of accounts with mataching account id
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
  //using sort() to sort through accounts array and return an array with the accounts in alphabetical order by last name
  return accounts.sort((a, b) => a.name.last < b.name.last ? -1 : 1); //a.name.last focuses on the last name and if the letter comes before the letter of b.last.name then it will place it first and if not it will place it next
}

function getTotalNumberOfBorrows(account, books) {
  //reduce() can be used with any data type, in this case a number
    return books.reduce((total, book) => {
     //use filter() to to build new array of the amount of borrows if the borrow id matches the account id
    const borrowCount = book.borrows.filter(borrow => borrow.id === account.id).length;
      //return total borrows for the account id
    return total + borrowCount;
  }, 0);
}

function getBooksPossessedByAccount(account, books, authors) {
 //filter() through books, if the borrow id and account id match AND the book has NOT been returned (some()) then add (map()) that book object to the new array with the author info
    return books.filter(book => book.borrows.some(borrow => borrow.id === account.id && !borrow.returned)).map(book => {
      const author = authors.find(author => author.id === book.authorId);
      return { ...book, author };
    });
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
