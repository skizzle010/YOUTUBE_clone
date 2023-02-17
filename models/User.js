const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    img: { type: String},
    subscriber: { type: Number,default: 0},
    subscribedUser:{ type:[String]}
  },
  { timestamps: true }
);

UserSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.password;
  delete obj._id;
  return obj;
};

module.exports = mongoose.model("User",UserSchema)



