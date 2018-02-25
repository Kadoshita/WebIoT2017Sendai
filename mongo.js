const mongoose = require('mongoose');

const dburl = process.env.NODE_MONGODB_CONNECTION_URL;
const dbport = process.env.NODE_MONGODB_CONNECTION_PORT;
const dbuser = process.env.NODE_MONGODB_CONNECTION_USER;
const dbpass = process.env.NODE_MONGODB_CONNECTION_PASS;
const dbconnectionstring = `mongodb://${dbuser}:${dbpass}@${dburl}:${dbport}/webiot2017sendai`;

const schema = mongoose.Schema;

const seatStatusSchema = new schema({
	seatNo: Number,
	status: Boolean
});

let seatStatusData = mongoose.model('seatstatu', seatStatusSchema);
let data = {
	seat: seatStatusData
};

mongoose.connect(dbconnectionstring, function (error) {
	if (error) {
		console.log(error);
	} else {
		console.log('DB connection success!');
	}
});

module.exports = data;
