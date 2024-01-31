function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  return books.reduce((count, book) => count + (!book.borrows[0].returned ? 1 : 0), 0);
}

//Helper Function:
function sortTopFivePopularItems(items, criteria, tally) {
   const getItemsByCriteria = items.map(item => item[criteria])
   const getCurrentItemCount = getItemsByCriteria.reduce((result, crit) => {
         const criteriaIndex = result.findIndex(element => element.name === crit);
         const currentItemBorrows = items.find(item => item[criteria] === crit).borrows.length;
         if (criteriaIndex >= 0) {
            result[criteriaIndex].count += 1;
         } else if (currentItemBorrows >= 1 && criteria === 'title') {
           result.push({ name: crit, count: currentItemBorrows });
         } else {
           result.push({ name: crit, count: tally });
         }
   return result;
   }, [])

   return getCurrentItemCount.sort((a, b) => b.count - a.count).slice(0, 5)
}

function getMostCommonGenres(books) {
  //use helper function
  const result = sortTopFivePopularItems(books, "genre", 1);
  return result;
}

function getMostPopularBooks(books) {
  //use helper function
  const result = sortTopFivePopularItems(books, 'title');
  return result;
}

function getMostPopularAuthors(books, authors) {
  const result = authors.map((author) => ({ 
    borrowsCount:books.filter((book) => book.authorId === author.id).reduce((count, current) => current.borrows.length, 0),
    ...author
  }));
  const topAuthors = result.sort((a, b) => b.borrowsCount - a.borrowsCount).slice(0,5);
  return topAuthors.map((topAuthor) => {
    const firstName = topAuthor.name.first
    const lastName = topAuthor.name.last
    return { name: `${firstName} ${lastName}`, count: topAuthor.borrowsCount }
  })
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
