import jsonData from './data.json';

export function getBookValues() {
    return jsonData.values;
}

export function getAllBooks() {
    return jsonData.books;
}

export function getBookById(id) {
    return jsonData.books.find(book => book.id == id);
}

export function getBookCover(book) {
    return require(`./img/${book.cover}`)
}


export function getAverageScore(book) {
    var scoresSum = 0;
    var reviewsSum = 0;
    if (book.scores.length !== 0) {
        scoresSum = book.scores.reduce((acc, s) => acc + s, 0);
    }
    if (book.reviews.length !== 0) {
        reviewsSum = book.reviews.reduce((acc, r) => acc + r.score, 0);
    }
    return (scoresSum + reviewsSum) / (book.scores.length + book.reviews.length);
}


export function getScoreArray(book) {
    return book.reviews.map((review) => review.score).concat(book.scores);
}

export function getBookLists() {
    const jsonString = localStorage.getItem("bookLists");
    var bookLists;
    if (jsonString === null) {
        bookLists = {
            "To Read": [],
            "Favorites": [],
            "Currently Reading": [],
            "Something": []
        };
    } else {
        bookLists = JSON.parse(jsonString);
    }

    return bookLists;
}

export function setBookLists(bookLists) {
    localStorage.clear()
    const jsonString = JSON.stringify(bookLists);
    localStorage.setItem("bookLists", jsonString);
}

