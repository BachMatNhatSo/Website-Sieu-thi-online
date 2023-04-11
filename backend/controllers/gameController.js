const Game = require('../models/game')

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures')
const cloudinary = require('cloudinary')

// Create new game   =>   /api/v1/admin/game/new
exports.newGame = catchAsyncErrors(async (req, res, next) => {

    let images = []
    if (typeof req.body.images === 'string') {
        images.push(req.body.images)
    } else {
        images = req.body.images
    }

    let imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: 'games'
        });

        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url
        })
    }

    req.body.images = imagesLinks
    req.body.user = req.user.id;

    const game = await Game.create(req.body);

    res.status(201).json({
        success: true,
        game
    })
})


// Get all games   =>   /api/v1/games?keyword=apple
exports.getGames = catchAsyncErrors(async (req, res, next) => {

    const resPerPage = 12;
    const gamesCount = await Game.countDocuments();

    const apiFeatures = new APIFeatures(Game.find(), req.query)
        .search()
        .filter()

    let games = await apiFeatures.query;
    let filteredGamesCount = games.length;

    apiFeatures.pagination(resPerPage)
    games = await apiFeatures.query;


    setTimeout(function () {
        res.status(200).json({
            success: true,
            gamesCount,
            resPerPage,
            filteredGamesCount,
            games
        })
    }, 2000)


})

// Get all games (Admin)  =>   /api/v1/admin/games
exports.getAdminGames = catchAsyncErrors(async (req, res, next) => {

    const games = await Game.find();

    res.status(200).json({
        success: true,
        games
    })

})

// Get single game details   =>   /api/v1/game/:id
exports.getSingleGame = catchAsyncErrors(async (req, res, next) => {

    const game = await Game.findById(req.params.id);

    if (!game) {
        return next(new ErrorHandler('Không tìm thấy game', 404));
    }


    res.status(200).json({
        success: true,
        game
    })

})

// Update Game   =>   /api/v1/admin/game/:id
exports.updateGame = catchAsyncErrors(async (req, res, next) => {

    let game = await Game.findById(req.params.id);

    if (!game) {
        return next(new ErrorHandler('Không tìm thấy game', 404));
    }

    let images = []
    if (typeof req.body.images === 'string') {
        images.push(req.body.images)
    } else {
        images = req.body.images
    }

    if (images !== undefined) {

        // Deleting images associated with the game
        for (let i = 0; i < game.images.length; i++) {
            const result = await cloudinary.v2.uploader.destroy(game.images[i].public_id)
        }

        let imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: 'games'
            });

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url
            })
        }

        req.body.images = imagesLinks

    }



    game = await Game.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        game
    })

})

// Delete Game   =>   /api/v1/admin/game/:id
exports.deleteGame = catchAsyncErrors(async (req, res, next) => {

    const game = await Game.findById(req.params.id);

    if (!game) {
        return next(new ErrorHandler('Không tìm thấy game', 404));
    }

    // Deleting images associated with the game
    for (let i = 0; i < game.images.length; i++) {
        const result = await cloudinary.v2.uploader.destroy(game.images[i].public_id)
    }

    await game.remove();

    res.status(200).json({
        success: true,
        message: 'Xóa game thành công'
    })

})


// Create new review   =>   /api/v1/review
exports.createGameReview = catchAsyncErrors(async (req, res, next) => {

    // Assuming req.user contains the ID of the user submitting the review
    const gameId = req.params.gameId;
    const userId = req.user._id;
    const review = {
        name: req.body.name,
        rating: req.body.rating,
        comment: req.body.comment
    };

    try {
        // Check if the user has downloaded the game
        const game = await Game.findOne({ _id: gameId, 'downloads.user': userId });
        if (!game) {
            return res.status(404).json({ message: 'You have not downloaded this game.' });
        }

        // Check if the user has already reviewed the game
        const downloadIndex = game.downloads.findIndex(download => download.user.equals(userId));
        const reviewIndex = game.downloads[downloadIndex].review.findIndex(r => r.name === review.name);
        if (reviewIndex !== -1) {
            // Update existing review
            game.downloads[downloadIndex].review[reviewIndex] = review;
        } else {
            // Add new review
            game.downloads[downloadIndex].review.push(review);
        }

        await game.save();

        res.status(200).json({ success: true, message: 'Review submitted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while submitting the review.' });
    }
})


// Get Game Reviews   =>   /api/v1/reviews
exports.getGameReviews = catchAsyncErrors(async (req, res, next) => {
    try {
        const game = await Game.findById(req.params.gameId).populate('downloads.user');
        const gameReviews = game.downloads.map(download => {
          const { user, review } = download;
          return {
            user: {
              id: user._id,
              name: user.name,
              email: user.email
            },
            review
          };
        });
        res.json({success: true, gameReviews})
      } catch (error) {
        res.status(500).json({ message: 'Không tìm thấy review' });
      }
})

// Delete Game Review   =>   /api/v1/reviews
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {

    const { gameId, userId, reviewId } = req.params;

    // Find the game and the download that contains the review to delete
    const game = await Game.findById(gameId);
    const download = game.downloads.find(
      (download) => download.user.toString() === userId
    );

    if (!download) {
      return res.status(404).json({ message: 'Download not found' });
    }

    const review = download.review.id(reviewId);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Remove the review from the download
    review.remove();
    await game.save();

    res.status(200).json({
        success: true
    })
})