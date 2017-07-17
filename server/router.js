const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

const BooksController = require('./controllers/books');
const TradesController = require('./controllers/trades');

const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignIn = passport.authenticate('local', {session: false});





module.exports = function(app) {

    app.post('/signin', requireSignIn, Authentication.signin);

    app.post('/signup', Authentication.signup);

    app.post('/changepassword', requireAuth, Authentication.changePassword);

    app.post('/editinfo', requireAuth, Authentication.editInfo);

    app.get('/getbooks', BooksController.getBooks);

    app.post('/addbook', requireAuth, BooksController.addBook);

    app.delete('/deletebook/:id', requireAuth, BooksController.deleteBook);

    app.post('/inittrade', requireAuth ,TradesController.initializeTrade);

    app.get('/gettrades', requireAuth, TradesController.getTrades);

    app.delete('/canceltrade/:id', requireAuth, TradesController.cancelTrade);

    app.put('/accepttrade/:id', requireAuth, TradesController.acceptTrade);
}