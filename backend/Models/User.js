const { types, required } = require("joi");
const mongo = require("mongoose");
const schema = mongo.Schema;

const UserSchema = new schema({
    name : {
        type :String,
        required : true,
    },
    email : {
        type :String,
        required : true,
        unique : true
    },
    password : {
        type :String,
        required : true,
    },
})

const UserModel =mongo.model('User2',UserSchema);
module.exports = UserModel;