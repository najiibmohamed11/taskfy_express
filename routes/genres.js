const express = require("express");
const { getgenerated, createGenres } = require('../controllers/genresController');

const router = express.Router();

router.get('/genares', getgenerated);
router.post('/genares', createGenres);

module.exports = router;
