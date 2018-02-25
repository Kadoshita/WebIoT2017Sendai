const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const router = express.Router();

require('dotenv').config();

const mongodb = require('./mongo');

app.use(express.static('static'));
app.use(bodyparser.urlencoded({
	extended: true
}));
app.use(bodyparser.json());

app.get('/', (req, res) => {
	return;
});

app.get('/api/seatstatus', (req, res) => {
	mongodb.seat.find({}).exec((err, data) => {
		console.log(data);
		res.send(data);
	})
});

app.post('/api/changestatus', (req, res) => {
	mongodb.seat.findOne({ seatNo: req.body.seatNo }, (err, data) => {
		if (err) {
			console.error(err);
		}

		if (!data) {
			let newdata = new mongodb.seat();
			newdata.seatNo = req.body.seatNo;
			newdata.status = (req.body.status === 'true') ? true : false;
			
			newdata.save((err, inserted) => {
				if (err) {
					console.console.error(err);
				}
				console.log(inserted);
			})
		} else {
			data.status = (req.body.status === 'true') ? true : false;
			data.save((err, updated) => {
				if (err) {
					console.console.error(err);
				}
				console.log(updated);
			});
		}
	})
	res.sendStatus(200);
	return;
})

app.listen(3000);