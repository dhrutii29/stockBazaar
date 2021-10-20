var mongoose = require('mongoose')

conn_str = 'mongodb://root:root@cluster0-shard-00-00.oci7g.mongodb.net:27017,cluster0-shard-00-01.oci7g.mongodb.net:27017,cluster0-shard-00-02.oci7g.mongodb.net:27017/stockBazaar?ssl=true&replicaSet=atlas-w610n5-shard-0&authSource=admin&retryWrites=true&w=majority'

mongoose.connect(conn_str, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected successfully..."))
	.catch( (error) => console.log(error) );

const sharesSchema = new mongoose.Schema({
    Name: String,
    Sector: String,
    Open: Number,
    Close: Number,
    High: Number,
    Low: Number,
    "Change(%)": Number,
    Volume: String
    
})

const SharesModel = new mongoose.model("shares", sharesSchema);

exports.Shares = SharesModel;

console.log("Complied Successfully")