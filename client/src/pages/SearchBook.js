import React, { useState } from "react";
import Jumbotron from "../components/Jumbotron";
import SaveBtn from "../components/Buttons/SaveBtn";
import ViewBtn from "../components/Buttons/ViewBtn";
import dbApi from "../utils/dbApi";
import googleBooksAPI from "../utils/googleBooksAPI";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/OtherComponents/List";
import { Input, FormBtn } from "../components/Form";

function SearchBook() {
  const [books, setBooks] = useState([]);
  const [formObject, setFormObject] = useState({
    title: "",
    subtitle: "",
    authors: [],
    link: "",
    description: "",
    image: "",
    date: "",
    googleID: "",
    _id: "",
  });

  function saveBook(id) {
    const bookIdx = books.reduce((acc, cur, idx) => {
      if (cur._id === id) {
        acc = idx;
      }
      return acc;
    }, -1);

    console.log(`∞° books[bookIdx=${bookIdx}]=\n`, books[bookIdx]);
    if (bookIdx >= 0 && !books[bookIdx].hasOwnProperty("saved")) {
      const book = books[bookIdx];
      dbApi
        .saveBook(book)
        .then(() => {
          const updBooks = books;
          updBooks[bookIdx].saved = true;
          setBooks(updBooks);
        })
        //  .then(() => loadBooks())
        .catch((err) => console.log(err));
    }
  }
  function viewBook(id) {
    const link = books.reduce((acc, cur) => {
      if (cur._id === id) {
        acc = cur.link;
      }
      return acc;
    }, "");
    if (link) {
      window.open(link);
    }
  }
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  }
  function handleFormSubmit(event) {
    event.preventDefault();
    if (formObject.title) {
      googleBooksAPI
        .search(formObject.title)
        .then((res) => {
          setBooks(res.data);
        })
        .then(() =>
          setFormObject({
            title: "",
            subtitle: "",
            authors: [],
            link: "",
            description: "",
            image: "",
            date: "",
            googleID: "",
            _id: "",
          })
        )
        //  .then(() => loadBooks())
        .catch((err) => console.log(err));
    }
  }

  return (
    <Container fluid>
      <Row>
        <Col size="md-12">
          <Jumbotron>
            <h1 className="text-center">Google Books</h1>
          </Jumbotron>
          <form>
            <Input
              onChange={handleInputChange}
              name="title"
              placeholder="Title (required)"
            />
            <FormBtn disabled={!formObject.title} onClick={handleFormSubmit}>
              SEARCH
            </FormBtn>
          </form>
        </Col>
        <Col size="md-12 sm-12">
          <Jumbotron>
            <h1>BOOK LIST</h1>
          </Jumbotron>
          {books.length ? (
            <List>
              {books.map((book) => {
                return (
                  <ListItem key={book._id}>
                    <Row>
                      <Col size="md-10 sm-12">
                        <strong>{book.title} by</strong>
                        <List>
                          {book.authors.map((author, index) => {
                            return (
                              <ListItem key={`${author}=${index}`}>
                                {author}
                              </ListItem>
                            );
                          })}
                        </List>
                      </Col>
                      <Col size="md-2 sm-12">
                        <SaveBtn
                          disabled={book.hasOwnProperty("saved")}
                          onClick={() => saveBook(book._id)}
                        />
                        <ViewBtn onClick={() => viewBook(book._id)} />
                      </Col>
                    </Row>
                    <Row>
                      <Col size="md-3 sm-12">
                        <img
                          alt="Book"
                          src={book.image}
                          className="img-fluid"
                        />
                      </Col>
                      <Col size="md-9 sm-12">{book.description}</Col>
                    </Row>
                  </ListItem>
                );
              })}
            </List>
          ) : (
            // <h2 className="text-center">{this.state.message}</h2>
            <h1>YOUR BOOKS</h1>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default SearchBook;

// EXTRA CODE
// useEffect(() => {
//   loadBooks()
// }, [])
//   function loadBooks() {
//     dbApi.getBooks()
//       .then(res =>
//        setBooks(res.data)
//       )
//       .catch(err => console.log(err));
//   };
//   function deleteBook(id) {
//     dbApi.deleteBook(id)
//       .then(res => loadBooks())
//       .catch(err => console.log(err));
//  };
