const bcryptjs = require('bcryptjs')

module.exports = {
    encrypt(password) {
        let hashed = bcryptjs.hashSync(password, 8)
        return hashed
    },
    decrypt(password, hash) {
        return bcryptjs.compareSync(password, hash)
    }
}