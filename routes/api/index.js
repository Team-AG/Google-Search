const router = require("express").Router();
const booksRoutes = require("./books");
const googleRoutes = require("./books");

// Book routes
router.use("/books", booksRoutes);

// Google Routes
router.use("/google", googleRoutes);

// For anything else, render the html page
router.use(function(req, res) {
    res.sendFile(path.join(__dirname, "../../client/build/index.html"));
  });

module.exports = router;