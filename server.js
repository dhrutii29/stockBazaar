const express = require('express');


const stocksRouter = require('./routes/stocks')
const loginsRouter = require('./routes/login')
const newsRouter = require('./routes/news')
const portfolioRouter = require('./routes/portfolio')
const apicall = require('./routes/news_api')
const app = express();
app.use('/views', express.static('views'));

app.set('view engine', 'ejs');

app.use('/stocks', stocksRouter);
app.use('/login', loginsRouter);
app.use('/news', newsRouter);
app.use('/portfolio', portfolioRouter);

app.get("/api/news", async (req, res) => {
	apicall.callNewsAPI(function(response) {
		res.write(response);
		res.end();
	})
})

app.get('/', (req, res) => {
    res.render('index', {user: "Dhruti"})
})
app.listen(8000)
