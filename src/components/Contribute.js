import React, { useState } from "react";
import { getAllAuthors, getAllBooks, getAllPublishers, getBookValues } from "../bookUtils";
import { iterateObject } from "../iterateObject";
import _ from 'lodash'
import AutoSuggest from "./AutoSuggest";
import AppDropdown from "./AppDropdown";
import { Container, Row, Col } from 'react-bootstrap';
import { toast } from "react-toastify";

function Contribute() {

  const fieldNames = {
    "title": "Title",
    "series": "Series",
    "volume": "Volume",
    "author": "Author",
    "genres": "Genres",
    "language": "Language",
    "classification": "Classification",
    "words": "Number of words",
    "published": "Publication date",
    "publisher": "Publishing house",
    "description": "Book description"
  }
  
  const [book, setBook] = useState(populateEmptyBook());
  console.log(book);

  function populateEmptyBook() {
    return iterateObject(getAllBooks()[0], {
      onValue: (value, keyPath, [emptyBook]) => {
        _.set(emptyBook, keyPath, null);
      },
      onFinal: (value, [emptyBook]) => {
        return emptyBook;
      }
    }, [{}]);
  }


  function setBookValue(key, value) {
    const newBook = _.cloneDeep(book);
    newBook[key] = value;
    setBook(newBook);
  }

  function handleSubmitBook() {
    const missingFields = [];
    for (let key in book) {
      if (book[key] === null) {
        if (!!fieldNames[key]) {
          missingFields.push(fieldNames[key]);
        }
      }
    }
    if (missingFields.length > 0) {
      toast.error(`Please fill out ${(missingFields.length === 1) ? "this field" : "these fields"}:\n${missingFields.join('\n')}`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast.success('Book submitted for approval', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });
      setBook(populateEmptyBook())
    }

  }


  return (
    <Container fluid className="mb-5">
      <Row>
        <Col xxl={4} lg={3} xs={1} />
        <Col xxl={4} lg={6} xs={10}>

          <h2 className="text-center">Contribute to ReviewInsight</h2>
          <p className="text-center fs-5">Add a book to the site's collection</p>

          <div className="content-box text-center py-3 mb-3">
            <h5>Title</h5>
            <input
              type='text'
              value={book.title ?? ''}
              onChange={(event) => setBookValue('title', (event.target.value.length > 0) ? event.target.value : null)}
              placeholder={'Book title...'}
              style={{ width: "80%" }}
            />

            <h5 className="mt-3">Series</h5>
            <input
              type='text'
              value={book.series ?? ''}
              onChange={(event) => setBookValue('series', (event.target.value.length > 0) ? event.target.value : null)}
              placeholder={'Series name...'}
              style={{ width: "45%", marginRight: "5%" }}
            />
            <input
              type='text'
              value={book.volume ?? ''}
              onChange={(event) => {
                const value = parseInt(event.target.value.replace(/\D/g, ''));
                setBookValue('volume', isNaN(value) ? null : value);
              }}
              placeholder={'Volume #'}
              style={{ width: "30%" }}
            />

            <h5 className="mt-3">Author</h5>
            <div className="mx-auto" style={{ width: "80%" }}>
              <AutoSuggest
                elements={(book.author === null) ? [] : [book.author]}
                handleElements={(values) => setBookValue('author', (values.length > 0) ? values[0] : null)}
                suggestions={getAllAuthors()}
                placeholder={'Author name...'}
                maxLines={1}
              />
            </div>

            <h5 className="mt-3">Genres</h5>
            <div className="mx-auto" style={{ width: "80%" }}>
              <AutoSuggest
                elements={(book.genres === null) ? [] : book.genres}
                handleElements={(values) => setBookValue('genres', (values.length > 0) ? values : null)}
                suggestions={getBookValues().genres}
                placeholder={'Type genres...'}
              />
            </div>

            <div className="mt-3 mx-auto d-flex justify-content-center" style={{ width: "80%" }}>
              <div className="w-100">
                <h5>Language</h5>
                <AppDropdown
                  emptyValue="Select language"
                  selectedItem={book.language ?? ''}
                  items={getBookValues().languages}
                  handleItemSelect={(value) => setBookValue('language', (value.length > 0) ? value : null)}
                  className="d-inline"
                />

                <h5 className="mt-3">Number of words</h5>
                <input
                  type='text'
                  value={book.words ?? ''}
                  onChange={(event) => {
                    const value = parseInt(event.target.value.replace(/\D/g, ''));
                    setBookValue('words', isNaN(value) ? null : value);
                  }}
                  placeholder={'# of words'}
                  style={{ width: "90%" }}
                />
              </div>

              <div className="w-100">
                <h5>Classification</h5>
                <AppDropdown
                  emptyValue="Select classification"
                  selectedItem={book.classification ?? ''}
                  items={getBookValues().classifications}
                  handleItemSelect={(value) => setBookValue('classification', (value.length > 0) ? value : null)}
                  className="d-inline"
                />

                <h5 className="mt-3">Publication date</h5>
                <input
                  type='date'
                  value={book.published ?? ''}
                  onChange={(event) => setBookValue('published', (event.target.value.length > 0) ? event.target.value : null)}
                  style={{ width: "90%" }}
                />
              </div>
            </div>

            <h5 className="mt-3">Publishing house</h5>
            <div className="mx-auto" style={{ width: "80%" }}>
              <AutoSuggest
                elements={(book.publisher === null) ? [] : [book.publisher]}
                handleElements={(values) => setBookValue('publisher', (values.length > 0) ? values[0] : null)}
                suggestions={getAllPublishers()}
                placeholder={'Company name...'}
                maxLines={1}
              />
            </div>

            <h5 className="mt-3">Book description</h5>
            <textarea
              value={book.description ?? ''}
              placeholder="Copy official book description..."
              onChange={(event) => setBookValue('description', (event.target.value.length > 0) ? event.target.value : null)}
              rows={4}
              className="px-1 py-2 mx-auto"
              style={{ width: "80%" }}
            />

          </div>

          <button className="button-pill fs-5 mt-4 light-bold" onClick={handleSubmitBook}>Submit book for approval</button>

        </Col>
        <Col xxl={4} lg={3} xs={1} />
      </Row>

    </Container>
  );
}

export default Contribute;