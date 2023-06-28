import React from 'react';



function BookCard({ book }) {
    function averageScore(scores, reviews) {
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

    const bookCover = require(`../img/${book.cover}`);
    const avgScore = averageScore(book.scores, book.reviews).toFixed(1);

    return (
        <div className="book-box">

            <div style={{ flex: '0 0 16.666%', maxWidth: '16.666%' }}>
                <img className="border" src={bookCover} alt="book1" />
            </div>

            <div style={{ flex: '0 0 83.333%', maxWidth: '83.333%' }}>
                
                <h4 className="d-inline">{book.title}</h4>
                <p className="mb-2 fs-5">by {book.author} - published {book.published}</p>

                <div className="d-flex">

                    <div style={{ flex: '0 0 16.666%', maxWidth: '16.666%' }}>
                        <div className="rating-box mx-auto">
                            <div className="rating-fill" style={{ height: `${avgScore*10}%` }}></div>
                            <h2 className="rating-text">{avgScore}</h2>
                        </div>
                        <p className="mb-0 text-center" style={{ fontSize: 'smaller' }}>200 reviews<br />2000 scores</p>
                    </div>

                    <div style={{ flex: '0 0 83.333%', maxWidth: '83.333%' }}>
                        <p className="book-desc ms-1 mb-0">{book.description}</p>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default BookCard;