import React, { useState } from "react";
import { getAllBooks, getBookValues } from "../bookUtils";
import { iterateObject } from "../iterateObject";
import _ from 'lodash'
import AutoSuggest from "./AutoSuggest";
import AppDropdown from "./AppDropdown";
import { Container, Row, Col } from 'react-bootstrap';

function Contribute() {

  const [book, setBook] = useState(iterateObject(getAllBooks()[0], {
    onValue: (value, keyPath, [emptyBook]) => {
      if (keyPath[0] === 'ratings' || keyPath[0] === 'reviews') {
        _.set(emptyBook, keyPath, []);
      } else {
        _.set(emptyBook, keyPath, null);
      }
    },
    onFinal: (value, [emptyBook]) => {
      return emptyBook;
    }
  }, [{}]));
  console.log(book);

  return (
    <Container fluid className="mb-5">
      <Row>
        <Col xxl={4} lg={3} xs={1} />
        <Col xxl={4} lg={6} xs={10}>

          <h1 className="text-center">Contribute to ReviewInsight</h1>
          <p className="text-center">Add a book to the site's collection</p>

          <div className="content-box text-center py-3 mb-3">
            <h5>Title</h5>
            <input
              type='text'
              value={''}
              onChange={() => null}
              placeholder={'Book title...'}
              style={{ width: "80%" }}
            />

            <h5 className="mt-3">Series</h5>
            <input
              type='text'
              value={''}
              onChange={() => null}
              placeholder={'Series name...'}
              style={{ width: "45%", marginRight: "5%" }}
            />
            <input
              type='text'
              value={''}
              onChange={() => null}
              placeholder={'Volume #'}
              style={{ width: "30%" }}
            />

            <h5 className="mt-3">Author</h5>
            <div className="mx-auto" style={{ width: "80%" }}>
              <AutoSuggest elements={[]} handleElements={() => null} suggestions={[]} placeholder={'Author name...'} maxLines={1} />
            </div>

            <h5 className="mt-3">Genres</h5>
            <div className="mx-auto" style={{ width: "80%" }}>
              <AutoSuggest elements={[]} handleElements={() => null} suggestions={[]} placeholder={'Type genres...'} />
            </div>

            <div className="mt-3 mx-auto d-flex justify-content-center" style={{ width: "80%" }}>
              <div className="w-100">
                <h5>Language</h5>
                <AppDropdown
                  emptyValue="Select language"
                  selectedItem={''}
                  items={[]}
                  handleItemSelect={() => null}
                  className="d-inline"
                />

                <h5 className="mt-3">Number of words</h5>
                <input
                  type='text'
                  value={''}
                  onChange={() => null}
                  placeholder={'Volume #'}
                  style={{ width: "90%" }}
                />
              </div>

              <div className="w-100">
                <h5>Classification</h5>
                <AppDropdown
                  emptyValue="Select classification"
                  selectedItem={''}
                  items={[]}
                  handleItemSelect={() => null}
                  className="d-inline"
                />

                <h5 className="mt-3">Publication date</h5>
                <input
                  type='date'
                  value={''}
                  onChange={() => null}
                  style={{ width: "90%" }}
                />
              </div>
            </div>

            <h5 className="mt-3">Publishing house</h5>
            <div className="mx-auto" style={{ width: "80%" }}>
              <AutoSuggest elements={[]} handleElements={() => null} suggestions={[]} placeholder={'Company name...'} maxLines={1} />
            </div>

            <h5 className="mt-3">Book description</h5>
            <textarea
              value={''}
              placeholder="Copy official book description..."
              onChange={() => null}
              rows={4}
              className="px-2 py-2 mx-auto"
              style={{ width: "80%" }}
            />

          </div>

          <button className="button-pill fs-5 mt-4 light-bold">Submit book for approval</button>

        </Col>
        <Col xxl={4} lg={3} xs={1} />
      </Row>

    </Container>
  );
}

export default Contribute;