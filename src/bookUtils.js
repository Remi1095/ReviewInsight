import jsonData from './data.json';

export function averageScore(scores, reviews) {
    var scoresSum = 0;
    var reviewsSum = 0;
    if (scores.length !== 0) {
        scoresSum = scores.reduce((acc, s) => acc + s, 0);
    }
    if (reviews.length !== 0) {
        reviewsSum = reviews.reduce((acc, r) => acc + r.score, 0);
    }
    return (scoresSum + reviewsSum) / (scores.length + reviews.length);
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