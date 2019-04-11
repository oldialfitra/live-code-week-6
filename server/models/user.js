const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    { encrypt } = require('../helpers/bcrypt')

const userSchema = new Schema({
    email: {
        type: String,
        validate: [{
            validator: function unique(input) {
                return new Promise((resolve, reject) => {
                    this.model('user').findOne({
                        email: input
                    })
                    .then(function (result) {
                        if (result) {
                            throw new Error('email already exists')
                        }
                        else {
                            resolve()
                        }
                    })
                    .catch(function (err) {
                        reject(err.message)
                    })
                })
            }
        }],
        required: [true, 'email required']
    },
    password: {
        type: String,
        required: [true, 'password required']
    }
})

userSchema.pre('save', function (next) {
    this.password = encrypt(this.password)
    next()
})

const User = mongoose.model('user', userSchema)

module.exports = User