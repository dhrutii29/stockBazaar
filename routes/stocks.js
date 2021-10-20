const express = require('express');
const router = express.Router();

const shares_model = require("./shares_module");
const shares = shares_model.Shares;


router.get('/', async (req, res) => {
    try{
        var data = await shares.find({},{_id:0}).sort({_id:-1});
        //res.send(data);
        //console.log(data);
        }
        catch (err) {
            res.json(err);
        }
    res.render('stocks', {data: data})
})


module.exports = router