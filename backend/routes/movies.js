const router = require('express').Router();
const movieController = require('../controllers/movies');

const upload = require('../multer/movie');

router
  .route('/')
  .get(movieController.findAll)
  .post(
    upload.fields([{ name: 'image' }, { name: 'poster' }]),
    movieController.add
  )
  .delete(movieController.delete)
  .put(
    upload.fields([{ name: 'image' }, { name: 'poster' }]),
    movieController.editMovie
  );
router.route('/id/:id').get(movieController.findById);
router.route('/title/:title').get(movieController.findByTitleTag);
router.route('/tags/').get(movieController.getMovieForTag);
router.route('/url').post(movieController.getURL);
router.route('/type/').get(movieController.getMovieForType);
router.route('/s').post(movieController.deleteMulti);
router.route('/watchIsLater').post(movieController.moviesWatchIsLater);
router.route('/search').get(movieController.searchMovie);
// router.route('/:category').get(movieController.findByTags);

module.exports = router;
