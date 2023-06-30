import jsonData from './data.json';

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