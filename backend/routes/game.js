const express = require('express')
const router = express.Router();


const {
    getGames,
    getAdminGames,
    newGame,
    getSingleGame,
    updateGame,
    deleteGame,
    createGameReview,
    getGameReviews,
    deleteReview,

} = require('../controllers/gameController')

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');


router.route('/games').get(getGames);
router.route('/admin/games').get(getAdminGames);
router.route('/game/:id').get(getSingleGame);

router.route('/admin/game/new').post(isAuthenticatedUser, authorizeRoles('admin'), newGame);

router.route('/admin/game/:id')
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateGame)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteGame);


router.route('/review').put(isAuthenticatedUser, createGameReview)
router.route('/reviews').get(isAuthenticatedUser, getGameReviews)
router.route('/reviews').delete(isAuthenticatedUser, deleteReview)

module.exports = router;