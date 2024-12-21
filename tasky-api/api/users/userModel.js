import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// 先准备一个正则表达式
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

const UserSchema = new Schema({
  username: {
    type: String, 
    unique: true, 
    required: [true, 'Username is required']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    validate: {
      validator: function (value) {
        return passwordRegex.test(value);
      },
      message:
        'Password must be at least 8 chars long, contain letters, digits and special characters.'
    }
  }
});

export default mongoose.model('User', UserSchema);
