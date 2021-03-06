const mongoose = require('mongoose');
mongoose.Promise = global.Promise
mongoose.connect('mongodb+srv://eveshi:woaiCHINA52c!@cluster0-tdf3l.mongodb.net/data-jour');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('conneted')
});

const userModelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
    required: true,
  },
  stared: {
    type: Array,
    required: true,
  },
  liked: {
    type: Array,
    required: true,
  },
  post: {
    type: Array,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  other: {
    type: Object,
    required: true,
  }
},{
  collection: 'user'
})

const userModel = mongoose.model('userModel', userModelSchema)

module.exports = userModel