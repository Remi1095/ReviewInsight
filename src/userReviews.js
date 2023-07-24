import { json } from "react-router";

export function setUserRating(bookid, rating) {
    const jsonString = localStorage.getItem("userReviews");
    if (jsonString === null) {
        localStorage.setItem("userReviews", JSON.stringify({ [bookid]: { "rating": rating } }));
    } else {
        const userReviews = JSON.parse(jsonString);
        if (!userReviews[bookid]) {
            userReviews[bookid] = {};
        }
        userReviews[bookid].rating = rating;
        localStorage.setItem("userReviews", JSON.stringify(userReviews));
    }
}

export function getUserRating(bookid) {
    const jsonString = localStorage.getItem("userReviews");
    const userReviews = JSON.parse(jsonString);
    return userReviews?.[bookid]?.rating;
}

export function setUserReview(bookid, review, spoilers) {
    const jsonString = localStorage.getItem("userReviews");
    if (jsonString === null) {
        localStorage.setItem("userReviews", JSON.stringify({ [bookid]: { "review": { "review": review, "spoilers": spoilers } } }));
    } else {
        const userReviews = JSON.parse(jsonString)
        console.log(userReviews)
        if (!userReviews[bookid]) {
            userReviews[bookid] = { "review": { "review": review, "spoilers": spoilers }};
        } else if (!userReviews[bookid].review) {
            userReviews[bookid].review = { "review": review, "spoilers": spoilers }
        } else {
            userReviews[bookid].review.review = review;
            userReviews[bookid].review.spoilers = spoilers;
        }
        localStorage.setItem("userReviews", JSON.stringify(userReviews));
    }
}

export function getUserReview(bookid) {
    const jsonString = localStorage.getItem("userReviews");
    const userReviews = JSON.parse(jsonString);
    return userReviews?.[bookid]?.review;
}