import jsonData from './data.json';

export function getBookValues() {
    return jsonData.values;
}

export function getAllBooks() {
    return jsonData.books;
}

export function getBookById(id) {
    return jsonData.books.find(book => book.id === parseInt(id));
}

export function getBookCover(book) {
    return require(`./img/${book.cover}`)
}


export function getAverageRating(book) {
    var ratingSum = 0;
    var reviewsSum = 0;
    if (book.ratings.length !== 0) {
        ratingSum = book.ratings.reduce((acc, rating) => acc + rating, 0);
    }
    if (book.reviews.length !== 0) {
        reviewsSum = book.reviews.reduce((acc, review) => acc + review.rating, 0);
    }
    return (ratingSum + reviewsSum) / (book.ratings.length + book.reviews.length);
}


export function getRatingArray(book) {
    return book.reviews.map((review) => review.rating).concat(book.ratings);
}

export function getAllAuthors() {
    return [...new Set(jsonData.books.map(book => book.author))];
}

export function getAllPublishers() {
    return [...new Set(jsonData.books.map(book => book.publisher))];
}

export function getBookLists() {
    const jsonString = localStorage.getItem("bookLists");
    return (jsonString === null) ? {"lists": jsonData.values.lists} : JSON.parse(jsonString);
}

export function setBookLists(bookLists) {
    localStorage.clear();
    localStorage.setItem("bookLists", JSON.stringify(bookLists));
}


export function getLists(bookid) {
    const jsonString = localStorage.getItem("bookLists");
    return (jsonString === null) ? [] : JSON.parse(jsonString)[bookid] || [];
}

export function setLists(bookid, lists) {
    const jsonString = localStorage.getItem("bookLists");
    const bookLists = (jsonString === null) ? {"lists": jsonData.values.lists} : JSON.parse(jsonString);
    bookLists[bookid] = lists;
    const newLists = lists.filter((list) => !bookLists.lists.includes(list));
    bookLists.lists.push(...newLists);
    localStorage.setItem("bookLists", JSON.stringify(bookLists));
}