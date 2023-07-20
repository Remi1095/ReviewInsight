import React, { useState } from "react";
import BookCover from "./BookCover";
import RatingSlider from "./RatingSlider";
import RatingBox from "./RatingBox";
import { getBookLists, setBookLists, getBookById, getAllBooks } from "../bookUtils";
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import AppDropdown from "./AppDropdown";

function Contribute() {

  const bookLists = getBookLists();
  const [selectedBook, setSelectedBook] = useState(getAllBooks()[2]);
  const [isCompact, setIsCompact] = useState(true);

  return (
    <Container fluid className="mb-5">
      <Row>
        <Col xxl={1}></Col>
        <Col className="pe-4" xxl={6} lg={7}>
          <div className="d-flex flex-wrap justify-content-left">
            {Object.keys(bookLists).map((key, index) => (
              <div key={index} className="mx-3 mb-3" style={{ maxWidth: "100%", width: isCompact ? 'unset' : '100%' }}>
                <h3>{key} ({bookLists[key].length})</h3>

                {bookLists[key].length > 0 && (
                  <div
                    className={`d-flex content-box p-2 me-auto ${isCompact ? '' : 'flex-wrap'} `}
                    style={{
                      maxWidth: "100%",
                      backgroundColor: 'var(--primary-3)',
                      borderColor: "gray",
                      overflow: "scroll"
                    }}
                  >
                    {bookLists[key].map((bookid, index) => {
                      const book = getBookById(bookid);
                      return (
                        <div key={index} className="p-1" style={{ width: "90px", minWidth: "90px" }}>
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

          <h3>Selected book:</h3>
          <div className="content-box pb-2">

            <Row className="p-2">
              <Col className="text-center" xs={4}>
                <div className="mx-auto mt-3 mb-2" style={{ width: "80%" }}>
                  <BookCover bgColor={selectedBook.fakeCover.bgColor} iconColor={selectedBook.fakeCover.iconColor} icon={selectedBook.fakeCover.icon} />
                </div>
                <p className="mb-0">Your rating</p>
                <RatingBox rating={5} textTag="h1" style={{ width: "50%" }} />

              </Col>

              <Col className="px-0 d-flex flex-column" xs={8}>
                {selectedBook.series !== null && <p className="fs-5 text-black-50 mb-1 mt-2">{selectedBook.series} #{selectedBook.volume}</p>}
                <h2>{selectedBook.title}</h2>
                <p className="fs-5">{selectedBook.author}</p>

                <div className="text-center d-flex flex-column justify-content-evenly" style={{ flex: "1 1 auto", width: "80%" }}>
                  <div>
                    <RatingSlider />
                    <u>Rate this book</u>
                  </div>

                  <div className="mx-auto">
                    <button className="button-pill mt-3 fs-5 light-bold w-100" onClick={() => null}>
                      Write a review
                    </button>
                  </div>
                </div>

              </Col>

            </Row>

            <div className="my-2" style={{ borderBottom: "1px solid lightgray" }} />

            <div className="p-2 d-flex flex-wrap">

              <div className="mx-auto mb-3">
                <div className="mx-auto" style={{ width: "fit-content" }}>
                  <h6>Save book in...</h6>
                  {Object.keys(bookLists).map((key, index) => (
                    <label key={index} className='d-block ms-3'>
                      <input
                        type="checkbox"
                        checked={false}
                        onChange={() => null}
                        className='me-2'
                      />
                      {key}
                    </label>
                  ))}
                  <div className='text-center mt-3'>
                    <u
                      className="border border-dark px-2 py-1 pointer"
                      style={{ backgroundColor: "var(--primary-3)" }}
                      onClick={() => null}
                    >
                      Apply changes
                    </u>
                  </div>
                </div>


              </div>

              <div className="mx-auto d-flex flex-column justify-content-evenly">
                <div className="text-center">
                  <input
                    type='text'
                    value={''}
                    onChange={() => null}
                    placeholder={'List name...'}
                    className='my-1'
                    style={{ width: "100%" }}
                  />
                  <div className='mt-2'>
                    <u
                      className="border border-dark px-2 py-1 pointer"
                      style={{ backgroundColor: "var(--primary-3)" }}
                      onClick={() => null}
                    >
                      Create new list
                    </u>
                  </div>
                </div>

                <div className="my-3" style={{ borderBottom: "1px solid lightgray" }} />

                <div>
                  <div className="d-flex justify-content-between">
                    <AppDropdown
                      emptyValue="Select list"
                      selectedItem={''}
                      items={Object.keys(bookLists)}
                      handleItemSelect={() => null}
                    />
                    <AppDropdown
                      emptyValue="Select list"
                      selectedItem={''}
                      items={Object.keys(bookLists)}
                      handleItemSelect={() => null}
                    />
                  </div>
                  <div className='mt-3 text-center'>
                    <span
                      className="border border-dark px-2 py-1 pointer"
                      style={{ backgroundColor: "var(--accent-2)" }}
                      onClick={() => null}
                    >
                      Move <u>list 1</u> items to <u>list 2</u>
                    </span>
                  </div>
                </div>

                <div className="my-3" style={{ borderBottom: "1px solid lightgray" }} />

                <div className="d-flex justify-content-center">
                  <div className='my-auto me-4'>
                    <u
                      className="border border-dark px-2 py-1 pointer"
                      style={{ backgroundColor: "var(--accent-2)" }}
                      onClick={() => null}
                    >
                      Remove list
                    </u>
                  </div>
                  <AppDropdown
                    emptyValue="Select list"
                    selectedItem={''}
                    items={Object.keys(bookLists)}
                    handleItemSelect={() => null}
                  />

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

export default Contribute;