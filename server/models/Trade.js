const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const tradeSchema = new Schema({
    from: {
        user: String,
        book: String
    },

    to: {
        user: String,
        book: String
    }
});


const Trade = mongoose.model('Trade', tradeSchema);

module.exports = Trade;