const router = require('express').Router();
const { isLogged } = require('../middlewares/authMiddleware');
const { getErrorMessage } = require('../utils/errorUtils');
const auctionService = require('../services/auctionService');


router.get('/catalog', async (req, res) => {

    const allAuctions = await auctionService.getAll().lean();

    res.render('auction/browse', { allAuctions });

});

router.get('/:auctionId/details', async (req, res) => {
    try {
        const userId = req.user?._id;
        const auctionId = req.params.auctionId;

        const selectedAuction = await auctionService.getById(auctionId).lean();
        const isAuthor = userId == selectedAuction.author;

        res.render('auction/details', { selectedAuction, isAuthor });

    } catch (error) {
        res.render('auctions/catalog', { error: getErrorMessage(error) });
    }
});

router.get('/publish', isLogged, async (req, res) => {
    console.log(req.user);
    res.render('auction/create');
});

router.post('/publish', isLogged, async (req, res) => {
    try {
        const authorId = req.user._id;
        const auctionData = { ...req.body, author: authorId };

        await auctionService.create(auctionData);
        res.redirect('auction/catalog');

    } catch (error) {
        res.render('auction/create', { error: getErrorMessage(error) });
    }
});







router.post('............', async (req, res) => {
    try {


        res.render('..........', {});

    } catch (error) {
        res.render('.....', { error: getErrorMessage(error) });
    }
});











router.get('........', async (req, res) => {
    try {


        res.render('games/details', {});

    } catch (error) {
        res.render('.....', { error: getErrorMessage(error) });
    }
});

module.exports = router