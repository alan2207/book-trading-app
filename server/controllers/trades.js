const  Book = require('../models/Book');
const Trade = require('../models/Trade');


// creating a new trade request
exports.initializeTrade = function(req, res, next) {
    const {fromUser, fromBook, toUser, toBook} = req.body;

    // check for identical requests, if so, do not create new one:
    Trade.findOne({"from.user": fromUser, "from.book": fromBook, "to.user": toUser, "to.book": toBook})
        .then((user) => {
            if(!user) {
                const trade = new Trade({
                from: {
                    user: fromUser,
                    book: fromBook
                },

                to: {
                    user: toUser,
                    book: toBook
                }
            });

            trade.save()
                .then((trade) => res.send('Trade Initialized'))
            } else {
                res.status(422).send('Already initialized!');
            }
        })
}

// getting all request in which the user is involved
exports.getTrades = function(req, res, next) {
    const user = req.user.username;

    Trade.find({$or: [{"from.user": user}, {"to.user": user}]})
        .then((trades) => res.send(trades))
}

// cancel trade - remove it from the database
exports.cancelTrade = function(req, res, next) {
    const {id} = req.params;

    Trade.findByIdAndRemove(id)
        .then(res.send('Canceled!'));
}



// accepting the trade
exports.acceptTrade = function(req, res, next) {
    const {id} = req.params;

    Trade.findById(id)
        .then((trade) => {
             Book.findOne({owner: trade.from.user, title: trade.from.book})
                .then((bookFrom) => {
                    Book.findOne({owner: trade.to.user, title: trade.to.book})
                        .then((bookTo) => {
                            // make sure the books belong to the given owners
                            if(bookFrom && bookTo) {
                                bookFrom.update({owner: trade.to.user})
                                    .then(() => {
                                        bookTo.update({owner: trade.from.user})
                                            .then(() => {
                                                trade.remove()
                                                    .then(() => res.send('Trade Completed!'));
                                            });
                                    })
                            } else {
                                trade.remove()
                                    .then(() => res.status(422).send('Trade failed! The book is not available.'));
                            }
                        })
                })
        })
}

