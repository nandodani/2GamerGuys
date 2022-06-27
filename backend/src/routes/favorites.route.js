const express = require("express");
const favoritesController = require("../controllers/favorites.controller");

const router = express.Router();

router.post("/favorited", favoritesController.getFavorited);



router.post("/getfavorites", favoritesController.getFavorites);
router.post("/removeallfavorites", favoritesController.removeAllFavorites);


router.post("/addfavorite", favoritesController.addFavorite);

router.post("/removefromfavorite", favoritesController.removeFromFavorite)


module.exports = router;