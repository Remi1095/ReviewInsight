import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { getBookLists, setBookLists, getLists, setLists, getBookById } from "../bookUtils";
import { getUserRating, getUserReview, setUserRating } from "../userReviews";
import BookCover from "./BookCover";
import RatingSlider from "./RatingSlider";
import RatingBox from "./RatingBox";
import AppDropdown from "./AppDropdown";
import { Container, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';




function MyLists() {

  const navigate = useNavigate();

  const [parsedBookLists, setParsedBookLists] = useState(parseBookLists())
  const [selectedBook, setSelectedBook] = useState(null);
  const [isCompact, setIsCompact] = useState(true);
  const [userBookRating, setUserBookRating] = useState(undefined)
  const [sliderRating, setSliderRating] = useState(5)
  const [selectedLists, setSelectedLists] = useState([]);
  const [createdList, setCreatedList] = useState('');
  const [movedLists, setMovedLists] = useState(['', '']);
  const [removedList, setRemovedList] = useState('');

  console.log(parsedBookLists);

  function parseBookLists() {
    const bookLists = getBookLists();
    return getBookLists().lists.reduce((acc, list) => {
      acc[list] = Object.keys(bookLists).filter((bookid) =>
        bookid !== "lists" & bookLists[bookid].includes(list)
      );
      return acc;
    }, {});
  }

  function toBookInfo() {
    navigate(`/book-info/${selectedBook.id}`);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function toReviewBook() {
    navigate(`/review-book/${selectedBook.id}`)
  }

  function handleBookSelect(book) {
    setSelectedBook(book);
    setSelectedLists(getLists(book.id));
    setUserBookRating(getUserRating(book.id))
    setSliderRating(getUserRating(book.id) ?? 5);
  }

  function handleRateBook() {
    setUserRating(selectedBook.id, sliderRating);
    setUserBookRating(sliderRating);
    toast(`Book rated ${sliderRating}/10`, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "dark",
    });
  }

  function handleListSelection(index) {
    const allLists = Object.keys(parsedBookLists);
    if (selectedLists.includes(allLists[index])) {
      setSelectedLists(selectedLists.filter((list) => list !== allLists[index]));
    } else {
      setSelectedLists([...selectedLists, allLists[index]]);
    }
  }

  function applyListSelection() {
    setLists(selectedBook.id, selectedLists);
    setParsedBookLists(parseBookLists());
  }

  function createList() {
    const bookLists = getBookLists();
    if (createdList !== '' && !bookLists.lists.includes(createdList)) {
      bookLists.lists.push(createdList);
      setBookLists(bookLists);
      setParsedBookLists(parseBookLists());
      setCreatedList('');
    }
  }

  function removeList() {
    if (removedList !== '') {
      const bookLists = getBookLists()
      for (let key in bookLists) {
        bookLists[key] = bookLists[key].filter((list) => list !== removedList);
      }
      setSelectedLists(bookLists[selectedBook.id]);
      setBookLists(bookLists);
      setParsedBookLists(parseBookLists());
      setRemovedList('');
    }
  }

  function moveLists() {
    if (movedLists[0] !== '' && movedLists[1] !== '') {
      const bookLists = getBookLists()
      for (let key in bookLists) {
        if (key !== 'lists') {
          if (bookLists[key].includes(movedLists[0]) && !bookLists[key].includes(movedLists[1])) {
            bookLists[key].push(movedLists[1]);
          }
          bookLists[key] = bookLists[key].filter((list) => list !== movedLists[0]);

        }
      }
      setSelectedLists(bookLists[selectedBook.id]);
      setBookLists(bookLists);
      setParsedBookLists(parseBookLists());
      setMovedLists(['', '']);
    }
  }

  return (
    <Container fluid className="mb-5">
      <Row>
        <Col xxl={1}></Col>
        <Col className="pe-4" xxl={6} lg={7}>
          <div className="d-flex flex-wrap justify-content-left">
            {Object.keys(parsedBookLists).map((list, index) => (
              <div key={index} className="mx-3 mb-3" style={{ maxWidth: "100%", width: isCompact ? 'unset' : '100%' }}>
                <h3>{list} ({parsedBookLists[list].length})</h3>

                {parsedBookLists[list].length > 0 && (
                  <div
                    className={`d-flex content-box p-2 me-auto ${isCompact ? '' : 'flex-wrap'} `}
                    style={{
                      width: isCompact ? "fit-content" : "100%",
                      maxWidth: "100%",
                      backgroundColor: 'var(--primary-3)',
                      borderColor: "gray",
                      overflowX: "auto"
                    }}
                  >
                    {parsedBookLists[list].map((bookid, index) => {
                      const book = getBookById(bookid);
                      return (
                        <div
                          key={index}
                          className="p-1 pointer"
                          style={{ width: "90px", minWidth: "90px" }}
                          onClick={() => handleBookSelect(book)}
                        >
                          <BookCover bgColor={book.fakeCover.bgColor} iconColor={book.fakeCover.iconColor} icon={book.fakeCover.icon} />
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Col>
        <Col xxl={4} lg={5}>

          {selectedBook !== null ? (
            <h3>Selected book:</h3>
          ) : (
            <h3>No book selected</h3>
          )}
          <div className="content-box pb-2">

            {selectedBook !== null && (
              <Row className="p-2">
                <Col className="text-center" xs={4}>
                  <div className="mx-auto mt-3 mb-2 pointer" style={{ width: "80%" }} onClick={toBookInfo}>
                    <BookCover bgColor={selectedBook.fakeCover.bgColor} iconColor={selectedBook.fakeCover.iconColor} icon={selectedBook.fakeCover.icon} />
                  </div>
                  <p className="mb-0">Your rating</p>
                  <RatingBox rating={userBookRating} textTag="h1" style={{ width: "50%" }} />
                </Col>

                <Col className="ps-0 pe-5 d-flex flex-column" xs={8}>
                  {selectedBook.series !== null && <p className="fs-5 text-black-50 mb-1 mt-2">{selectedBook.series} #{selectedBook.volume}</p>}
                  <h2 className="pointer" onClick={toBookInfo}>{selectedBook.title}</h2>
                  <p className="fs-5">{selectedBook.author}</p>

                  <div className="text-center d-flex flex-column justify-content-evenly" style={{ flex: "1 1 auto", width: "100%" }}>
                    <div>
                      <RatingSlider rating={sliderRating} handleRating={setSliderRating} />
                      <div className="mt-2">
                        {userBookRating ? (
                          <u className="fs-5 pointer" onClick={handleRateBook}>Change your rating</u>
                        ) : (
                          <u className="fs-5 pointer" onClick={handleRateBook}>Rate this book</u>
                        )}
                      </div>
                    </div>

                    <div className="mx-auto">
                      <button className="button-pill mt-3 fs-5 light-bold w-100" onClick={toReviewBook}>
                        {!getUserReview(selectedBook.id) ? "Write a review" : "Change your review"}
                      </button>
                    </div>
                  </div>

                </Col>
              </Row>
            )}

            <div className="my-2" style={{ borderBottom: "1px solid lightgray" }} />

            <div className="p-2 d-flex flex-wrap">

              {selectedBook !== null && (
                <div className="mx-auto mb-3">
                  <div className="mx-auto" style={{ width: "fit-content" }}>
                    <h6>Save book in...</h6>
                    {Object.keys(parsedBookLists).map((list, index) => (
                      <label key={index} className='d-block ms-3'>
                        <input
                          type="checkbox"
                          checked={selectedLists.includes(list)}
                          onChange={() => handleListSelection(index)}
                          className='me-2 my-2'
                        />
                        {list}
                      </label>
                    ))}
                    <div className='text-center mt-3'>
                      <u
                        className="border border-dark px-2 py-1 pointer"
                        style={{ backgroundColor: "var(--primary-3)" }}
                        onClick={applyListSelection}
                      >
                        Apply changes
                      </u>
                    </div>
                  </div>
                </div>
              )}

              <div className="mx-auto d-flex flex-column justify-content-around">
                <div className="text-center">
                  <input
                    type='text'
                    value={createdList}
                    onChange={(event) => setCreatedList(event.target.value)}
                    placeholder={'List name...'}
                    className='my-1'
                    style={{ width: "100%" }}
                  />
                  <div className='mt-2'>
                    <u
                      className="border border-dark px-2 py-1 pointer"
                      style={{ backgroundColor: "var(--primary-3)" }}
                      onClick={createList}
                    >
                      Create new list
                    </u>
                  </div>
                </div>

                <div className="my-3" style={{ borderBottom: "1px solid lightgray" }} />

                <div>
                  <div className="d-flex justify-content-center">
                    <AppDropdown
                      emptyValue="Select list 1"
                      selectedItem={movedLists[0]}
                      items={Object.keys(parsedBookLists)}
                      handleItemSelect={(list) => setMovedLists([list, movedLists[1]])}
                      className="me-3"
                    />
                    <AppDropdown
                      emptyValue="Select list 2"
                      selectedItem={movedLists[1]}
                      items={Object.keys(parsedBookLists)}
                      handleItemSelect={(list) => setMovedLists([movedLists[0], list])}
                    />
                  </div>
                  <div className='mt-3 text-center'>
                    <span
                      className="border border-dark px-2 py-1 pointer"
                      style={{ backgroundColor: "var(--accent-2)" }}
                      onClick={moveLists}
                    >
                      Move <u>list 1</u> items to <u>list 2</u>
                    </span>
                  </div>
                </div>

                <div className="my-3" style={{ borderBottom: "1px solid lightgray" }} />

                <div className="d-flex justify-content-center">

                  <AppDropdown
                    emptyValue="Select list"
                    selectedItem={removedList}
                    items={Object.keys(parsedBookLists)}
                    handleItemSelect={(list) => setRemovedList(list)}
                  />
                  <div className='my-auto ms-4'>
                    <u
                      className="border border-dark px-2 py-1 pointer"
                      style={{ backgroundColor: "var(--accent-2)" }}
                      onClick={removeList}
                    >
                      Remove list
                    </u>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </Col>
        <Col xxl={1}></Col>
      </Row>
    </Container >
  );
}

export default MyLists;