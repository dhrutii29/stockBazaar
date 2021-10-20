var mongoose = require('mongoose')

conn_str = 'mongodb://root:root@cluster0-shard-00-00.oci7g.mongodb.net:27017,cluster0-shard-00-01.oci7g.mongodb.net:27017,cluster0-shard-00-02.oci7g.mongodb.net:27017/stockBazaar?ssl=true&replicaSet=atlas-w610n5-shard-0&authSource=admin&retryWrites=true&w=majority'

mongoose.connect(conn_str, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => console.log("Connected successfully..."))
	.catch( (error) => console.log(error) );

const signupSchema = new mongoose.Schema({
    "name": {type: String, required: true},
    "contactNo": {type: String, required: true, unique: true},
    "email": {type: String, required: true, unique: true},
    "balance": {type: Number, required: true},
    "password": {type: String, required: true},
    "investment": {type: Number, default: 0},
    "userId": String,
    portfolio: [{
        stock: String,
        qty: Number
      }]
})

const SignupModel = new mongoose.model("signup", signupSchema);

exports.Signup = SignupModel;

console.log("Complied Successfully")

//https://upstox.com/developer/api/v1/docs/?javascript#orders-details
//API key: HPTTMO4V5O80XCX0