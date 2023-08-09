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
        // const userId = req.user._id;
        const auctionId = req.params.auctionId;

        const selectedAuction = await auctionService.getById(auctionId).lean().populate('author');
        const isAuthor = selectedAuction.author._id?.toString() === req.user?._id;
        console.log(isAuthor);

        res.render('auction/details', { selectedAuction, isAuthor });

    } catch (error) {
        res.render('auction/catalog', { error: getErrorMessage(error) });
    }
});

router.get('/publish', isLogged, async (req, res) => {
    console.log(req.user);
    res.render('auction/create');
});

router.get('/:auctionId/edit', isLogged, async (req, res) => {
    const auctionId = req.params.auctionId;
    const selectedAuction = await auctionService.getById(auctionId).lean();

    res.render('auction/edit', { selectedAuction });
});

router.post('/:auctionId/edit', isLogged, async (req, res) => {
    try {
        const auctionId = req.params.auctionId;
        const auctionData = req.body;

        const updatedAuction = await auctionService.edit(auctionId, auctionData);
        res.redirect(`/auctions/${auctionId}/details`)
    } catch (error) {

    }
});

router.post('/publish', isLogged, async (req, res) => {
    try {
        const authorId = req.user._id;
        const auctionData = { ...req.body, author: authorId };

        await auctionService.create(auctionData);
        res.redirect('/auctions/catalog');

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