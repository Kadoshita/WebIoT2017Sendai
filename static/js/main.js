$(document).ready(function () {
	//addAngleEvent();
	setInterval(function () {
		dConnect.get('http://' + configs[0].ip + ':' + configs[0].port + '/gotapi/gpio/analog/A0?serviceId=' + configs[0].gpioId, null, function (data) {
			if (data.value > 700) {
				dataPost(configs[0].seatNo, false);
			} else {
				dataPost(configs[0].seatNo, true);
			}
			console.log(data.value);
		}, function (errcode, errmsg) {
			console.error(errmsg);
		});
	}, 1000);

	setInterval(function () {
		dConnect.get('http://' + configs[1].ip + ':' + configs[1].port + '/gotapi/gpio/analog/A0?serviceId=' + configs[1].gpioId, null, function (data) {
			if (data.value > 700) {
				dataPost(configs[1].seatNo, false);
			} else {
				dataPost(configs[1].seatNo, true);
			}
			console.log(data.value);
		}, function (errcode, errmsg) {
			console.error(errmsg);
		});
	}, 1000);

	setInterval(function () {
		$.getJSON('/api/seatstatus', function (data) {
			console.log(data);
			createTable(data);
		});
	}, 1000);
});

function createTable(json) {
	var tableString = '<table class="table table-bordered"><tbody>';
	for (var i in json) {
		if (i % 2 === 0)
			tableString += '<tr>';
		
		if ((json[i].status).toString() === 'true') {
			tableString += '<td class="text-center color-blue" onclick="vib(' + i + ')"><p>席' + (parseInt(i, 10) + 1) +
				'</p>○<p></p></td >';
		} else {
			tableString += '<td class="text-center color-red"  onclick="vib(' + i +')"><p>席' + (parseInt(i, 10) + 1) +
				'</p>×<p></p></td >';
		}
		
		if (i % 2 !== 0)
			tableString += '</tr>';
	}
	tableString += '</tbody><table>';
	
	$('#table').html(tableString);
}

function dataPost(seatno, seatstatus) {
	$.post('/api/changestatus', {
		seatNo: seatno,
		status: seatstatus
	}, function () {
		console.log('success');
	});
}

function vib(no) {
	vibOn(no);
}
function vibOn(no) {
	var pin = "D2";
	var uri = "http://" + configs[no].ip + ":" + configs[no].port + "/gotapi/gpio/digital/" + pin + "?serviceId=" + configs[no].gpioId;
	var header = null;
	var data = null;
	dConnect.put(uri, header, data, function (json) {
		console.log(json);
	}, function (errorCode, errorMessage) {
		console.log(errorMessage);
		});
	
	setTimeout(function () {
		vibOff(no);
	}, 2000);
}
function vibOff(no) {
	var pin = "D2";
	var uri = "http://" + configs[no].ip + ":" + configs[no].port + "/gotapi/gpio/digital/" + pin + "?serviceId=" + configs[no].gpioId;
	var header = null;
	dConnect.delete(uri, header, function (json) {
		console.log(json);
	}, function (errorCode, errorMessage) {
		console.log(errorMessage);
	});
}