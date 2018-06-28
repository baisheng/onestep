const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema(
  {
    username: { type: String, unique: true },
    password: { type: String },
    admin: { type: Boolean },
    phoneNum: { type: String, unique: true },
    bindings: [
      {
        _id: false,
        via: String,
        nickName: String,
        headImgUrl: String,
        unionId: String,
      },
    ],
  },
  { timestamps: true }
)

// eslint-disable-next-line
UserSchema.pre('save', function(next) {
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(this.password, salt)
  this.password = hash
  next()
})

UserSchema.methods.comparePassword = (password, cb) => {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) {
      return cb(err)
    }
    cb(null, isMatch)
  })
}

module.exports = mongoose.model('User', UserSchema)
