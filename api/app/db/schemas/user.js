'use strict';

const Mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const Schema = Mongoose.Schema;

const bcrypt = require('bcrypt-nodejs');

const SALT_WORK_FACTOR = 10;
const DEFAULT_AVATAR = '';

const UserSchema = new Schema({
  userName: { type: String, unique: true, required: true, trim: true },
  email: { type: String, unique: true, trim: true, required: true },
  userId: { type: Number, default: 1 },
  password: { type: String, required: true },
  socialId: { type: String, default: null },
  avatar:  { type: String, default:  DEFAULT_AVATAR}
});

UserSchema.pre('save', function(next) {
  const user = this;
  if (!user.avatar) user.avatar = DEFAULT_AVATAR;

  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.validatePassword = function(password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password, (err, isMatch) => {
      if (err) return reject(err);

      resolve(isMatch);
    });
  });
};

UserSchema.plugin(autoIncrement.plugin, { model: 'user', field: 'userId', startAt: 1 });

const UserModel = Mongoose.model('user', UserSchema);

module.exports = UserModel;