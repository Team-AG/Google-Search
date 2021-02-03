const axios = require("axios");
const qs = require("qs");
const dotenv = require("dotenv").config();


// const db = require('db')
// db.connect({
//   host: process.env.DB_HOST,
//   username: process.env.DB_USER,
//   password: process.env.DB_PASS
// })

module.exports = {
  search: function (req, res) {
    const baseUrl = "https://www.googleapis.com/books/v1/volumes?";
    const queryObj = {
      q: `${req.params.search}`,
      key: process.env.GOOGLEBOOKS_API_KEY,
    };
    const queryURL = baseUrl + qs.stringify(queryObj);
    console.log("GoogleBooks queryURL=\n", queryURL);
    axios
      .get(queryURL)
      .then((response) => {
        const bookData = response.data.items.map((item) => {
          const bookItem = {};
          bookItem["title"] = item.volumeInfo["title"];
          bookItem["authors"] = item.volumeInfo["authors"];
          bookItem["description"] = item.volumeInfo["description"];
          bookItem["image"] = item.volumeInfo.imageLinks["thumbnail"];
          bookItem["link"] = item.volumeInfo["canonicalVolumeLink"];
          bookItem["_id"] = item["id"];
          return bookItem;
        });
        console.log("∞° bookData=\n", bookData);
        res.json(bookData);
      })
      .catch((error) => {
        console.log(error);
        res.send(error);
      });
  },

  searchTitle: function (req, res) {
    const baseUrl = "https://www.googleapis.com/books/v1/volumes?";
    const queryObj = {
      // q: `${req.params.title}`,
      q: `+ontitle:${req.params.title}`,
      key: process.env.GOOGLEBOOKS_API_KEY,
    };
    const queryURL = baseUrl + qs.stringify(queryObj);
    console.log("GoogleBooks queryURL=\n", queryURL);
    axios
      .get(queryURL)
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        console.log(error);
        res.send(error);
      });
  },

  findAll: function(req, res) {
    const { query: params } = req;
    axios
      .get("https://www.googleapis.com/books/v1/volumes", {
        params
      })
      .then(results =>
        results.data.items.filter(
          result =>
            result.volumeInfo.title &&
            result.volumeInfo.infoLink &&
            result.volumeInfo.authors &&
            result.volumeInfo.description &&
            result.volumeInfo.imageLinks &&
            result.volumeInfo.imageLinks.thumbnail
        )
      )
      .then(apiBooks =>
        db.Book.find().then(dbBooks =>
          apiBooks.filter(apiBook =>
            dbBooks.every(dbBook => dbBook.googleId.toString() !== apiBook.id)
          )
        )
      )
      .then(books => res.json(books))
      .catch(err => res.status(422).json(err));
  }
  
};
