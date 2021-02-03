import React, { useEffect, useState } from "react";
import Jumbotron from "../components/Jumbotron";
import DeleteBtn from "../components/Buttons/DeleteBtn";
import ViewBtn from "../components//Buttons/ViewBtn";
import dbApi from "../utils/dbApi";
// import Card from "../components/Card";
// import Book from "../components/Book";
// import Footer from "../components/Footer";
// import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/OtherComponents/List";

// class Saved extends Component {
function Saved() {
  // state = {
  //   books: []
  // };

  const [books, setBooks] = useState([]);

  useEffect(() => {
    loadBooks();
  }, []);

  // Loads books
  function loadBooks() {
    dbApi
      .getBooks()
      .then((res) => setBooks(res.data))
      .catch((err) => console.log(err));
  }

  // componentDidMount() {
  //   this.getSavedBooks();
  // }

  // getSavedBooks = () => {
  //   //make the API.getSavedBooks() call
  // }

  // Delete book
  function deleteBook(id) {
    dbApi
      .deleteBook(id)
      .then((res) => loadBooks())
      .catch((err) => console.log(err));
  }
  // handleBookDelete = id => {
  //   API.deleteBook(id).then(res => this.getSavedBooks());
  // };


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

  return (
    <Container fluid>
      <Row>
        <Col size="md-12">
          <Jumbotron>
            <h3>(React) Google Books Search</h3>
            <h4>Search for and save books of interest</h4>
          </Jumbotron>
        </Col>
        <Col size="md-12 sm-12">
          <Jumbotron>
            <h1>Results List</h1>
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
                        <DeleteBtn onClick={() => deleteBook(book._id)} />
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
            <h3>No Results to Display</h3>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Saved;
