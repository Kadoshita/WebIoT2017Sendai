$(document).ready(function () {
	setInterval(function () {
		$.getJSON('/api/seatstatus', function (data) {
			$('#data').val(JSON.stringify(data));
			createTable(data);
		});
	}, 1000);
});

function createTable(json) {
	console.log(json);
	var tableString = '<table class="table table-bordered"><tbody>';
	for (var i in json) {
		if (i % 2 === 0)
			tableString += '<tr>';
		
		if ((json[i].status).toString() === 'true') {
			tableString += '<td class="text-center"><p>席' + (parseInt(i, 10) + 1) +
				'</p>○<p></p></td >';
		} else {
			tableString += '<td class="text-center"><p>席' + (parseInt(i, 10) + 1) +
				'</p>×<p></p></td >';
		}
		
		if (i % 2 !== 0)
			tableString += '</tr>';
	}
	tableString += '</tbody><table>';
	
	console.log(tableString);

	$('#table').html(tableString);
}