const router = require("express").Router();
const searchController = require("../../controllers/searchController");

router
  .route("/:search")
  .get(searchController.search)
  .get(searchController.findAll);

router.route("/:search").get(searchController.search);
router.route("/title/:title").get(searchController.searchTitle);
router.route("/findAll/:findAll").get(searchController.findAll);

module.exports = router;
