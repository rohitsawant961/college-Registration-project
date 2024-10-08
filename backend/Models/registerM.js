const mongo = require("mongoose");
const schema = mongo.Schema;

const RegisterSchema = new schema({
    Marks : {
        type :String,
        required : true,
    },
    Percentile : {
        type :String,
        required : true,
    },
    Cast : {
        type :String,
        required : true,
    },
})

const RegisterModel =mongo.model('Register_',RegisterSchema);
module.exports = RegisterModel;