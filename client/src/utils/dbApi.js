import axios from "axios";

export default {
  // Gets books from the Google API
  getBooks: function (q) {
    return axios.get("/api/google", { params: { q: "title:" + q } });
  },
  // getBooks: function () {
  //   return axios.get("/api/books");
  // },

  getSavedBooks: function () {
    return axios.get("/api/books");
  },
  deleteBook: function (id) {
    return axios.delete("/api/books/" + id);
  },
  saveBook: function (bookData) {
    return axios.post("/api/books", bookData);
  },
};
