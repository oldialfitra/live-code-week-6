const mongoose = require('mongoose'),
    Schema = mongoose.Schema

const favoriteSchema = new Schema({
    joke: {
        type: String
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
})

const Favorite = mongoose.model('joke', favoriteSchema)

module.exports = Favorite