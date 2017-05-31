var countdown = 0;
var totalTime = 5;

function CountDown() {
	countdown++;
	var minutes_mesured = Math.floor(countdown/60);
	var seconds_mesured = Math.floor(countdown%60);
	minutes = totalTime - minutes_mesured;
	seconds = 60 -seconds_mesured;
	if (minutes < 10) {
		minutes = "0" + minutes;
	}
	if (seconds < 10) {
		seconds = "0" + seconds;
	}
	document.getElementById("TimerText").innerHTML = minutes + ":" + seconds;
	document.getElementById("ProgressBar").style.width = "" + (seconds_mesured/300) * 100 + "%";

	if (minutes == 0){
		alert("O SEU PEDIDO ESTA PRONTO");
	}

	document.onkeypress = function(evt) {
	    evt = evt || window.event;
	    var charCode = evt.keyCode || evt.which;
	    var charStr = String.fromCharCode(charCode);
	    if(charStr == "k"){
	    	alert("Problema Na Cozinha");
	    	totalTime+=2;
	    }
	};
}

var t = setInterval(CountDown, 1000);

