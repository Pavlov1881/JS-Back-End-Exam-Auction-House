const router = require('express').Router();
const { isLogged } = require('../middlewares/authMiddleware');
const { getErrorMessage } = require('../utils/errorUtils');
//! import service












router.get('........', async (req, res) => {
    try {


        res.render('games/details', {});

    } catch (error) {
        res.render('.....', { error: getErrorMessage(error) });
    }
});

module.exports = router