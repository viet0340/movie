const router = require('express').Router();

const movieRoutes = require('./movies');
const userRouter = require('./users');

router.use('/api/movie', movieRoutes);
router.use('/api/user', userRouter);

module.exports = router;
