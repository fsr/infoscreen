var stopsMin = {"helmholtz":0, "muenchner":6, "technische":12};
var stops = Object.keys(stopsMin);
var tickerCopyright = "(Der Postillon)";
var version = "0"

var news = new Array();
var ticker = new Array();
var currentNews = 0;
var currentTicker = 0;
// last update (text)
var luDVB = 0;
var luTicker = 0;
var luNews = 0;
var lutDVB = "";
var lutTicker = "";
var lutNews = "";
var raspiIP = "";
// ajax requests
var dynamos = new Array();
for(s in stops) dynamos.push(new XMLHttpRequest());

var rssreq = new XMLHttpRequest();
var tickerreq = new XMLHttpRequest();
var versionreq = new XMLHttpRequest();
var ipreq = new XMLHttpRequest();


function updateTicker() {
	tickerreq.open('GET', 'ticker.fsr');
	tickerreq.onreadystatechange = function() {
				if(this.readyState!=4) return;
				if(this.status==200) saveTicker(this.responseText);
			};
	tickerreq.send(null);
}

function saveTicker(tickerjson) {
	var tickertext = JSON.parse(tickerjson);
	luTicker = new Date().getTime();
	ticker = tickertext["ticker"];
	showTicker();
}

function updateVersion() {
	versionreq.open('GET', 'version.fsr');
	versionreq.onreadystatechange = function() {
				if(this.readyState!=4) return;
				if(this.status==200) {
					var versiontext = JSON.parse(this.responseText);
					version = versiontext[2];
				};
			};
	versionreq.send(null);
}

function showTicker() {
	document.getElementById("ticker").innerHTML = ticker[currentTicker++];

	if(currentTicker>=ticker.length-1) currentTicker = 0;
	if(ticker.length>0) {
		document.getElementById("ticker").innerHTML = ticker[currentTicker]+" <span class=\"tickersrc\">"+tickerCopyright+"</span>";
		currentTicker++;
	} else {
		document.getElementById("ticker").innerHTML = "Derzeit kein Ticker.";

	}

}

function updateRSS() {
	rssreq.open('GET', 'rss.fsr');
	rssreq.onreadystatechange = function() {
				if(this.readyState!=4) return;
				if(this.status==200) saveRSS(this.responseText);
			};
	rssreq.send(null);
}

function saveRSS(response) {
	var tempnews = response.split("<!--next-->");
	if(tempnews.length>1) {
		news = tempnews;
	} else {
		setTimeout('updateRSS()', 20000);
	}
	luNews= new Date().getTime();
	showRSS();
}

function showRSS() {
	if(currentNews>=news.length-1) currentNews = 0;
	if(news.length>1) {
		document.getElementById("newsbox").innerHTML = news[currentNews];
		currentNews++;
		document.getElementById("pages").innerHTML = currentNews+"/"+(news.length-1);
	} else {
		document.getElementById("newsbox").innerHTML = "Derzeit keine Nachrichten.";
		document.getElementById("pages").innerHTML = "";

	}

}

function updateDVB() {
	for(dyn in dynamos) {
		dynamos[dyn].open('GET', 'dvb.fsr?'+stops[dyn]+"&"+stopsMin[stops[dyn]]+"&4");
		dynamos[dyn].onreadystatechange = function(dyni) {
			return function() {
					if(this.readyState!=4) return;
					if(this.status==200) showDVB(stops[dyni], this.responseText);
				};
			}(dyn);

	dynamos[dyn].send(null);

	}

}

window.onload = function() {

	updateTime();
	setInterval('updateTime()', 1000);
	showDebug();
	setInterval('showDebug()', 2000);
	updateDVB();
	setInterval('updateDVB()', 45000);
	updateRSS();
	setInterval('updateTicker()', 600000);
	updateTicker();
	setInterval('updateRSS()', 1800000);
	setInterval('showRSS()', 20000);
	setInterval('showTicker()', 15000);
	updateVersion();
	ipreq.open('GET', 'ip.fsr');
	ipreq.onreadystatechange = function() {
				if(this.readyState!=4) return;
				if(this.status==200) raspiIP = this.responseText;
			};
	ipreq.send(null);
}

function showDVB(station, response) {
	var nextup = eval('(' + response + ')');

	var table = "";

	nextup.forEach(function(val) {
		table += "<tr><td class=\"vvono vvono"+val[0]+"\">"+val[0]+"</td><td class=\"vvostation\">"+val[1].replace("Dresden","")+"</td><td class=\"vvomin\">"+val[2]+"</td></tr>";
	});

	document.getElementById(station+"table").innerHTML = table;
	luDVB = new Date().getTime();
}

function updateTime() {
	var time = new Date();
	var year = time.getFullYear();
	var month = time.getMonth();
	var dayt = time.getDate();
	var hours = time.getHours();
	var mins = time.getMinutes();
	var seconds = time.getSeconds();

	dayt = (dayt<10?"0":"")+dayt;
	hours = (hours<10?"0":"")+hours;
	mins = (mins<10?"0":"")+mins;
	seconds = (seconds<10?"0":"")+seconds;

	var months = ["Januar", "Februar", "M&auml;rz", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
	var kw = week(time);

	var text = kw + ". Woche &ndash; "+ dayt +". "+ months[month] + " " + year +" &ndash; "+ hours + ":" + mins + ":" + seconds;

	document.getElementById("footer").innerHTML = text;
}

function dayOfTheYear(date) {
	var year = date.getFullYear();
	var days = new Array(31,(year%400==0||(year%4==0&&year%100!=0))?29:28,31,30,31,30,31,31,30,31,30,31);
	var doty = date.getDate();
	for(var i=0; i < date.getMonth(); i++) {
		doty += days[i];
	}
	return doty;
}

function week(date) {
	var day = date.getDay();
	if(day==0) day = 7; // In ISO-8601, Sunday is 7, not 0
	return Math.floor((dayOfTheYear(date)-day+10)/7);
}

function showDebug() {
	lutDVB = Math.round((new Date().getTime()-luDVB)/1000);
	lutTicker = Math.round((new Date().getTime()-luTicker)/1000);
	lutNews = Math.round((new Date().getTime()-luNews)/1000);
	var debugText = "D"+lutDVB+" / T"+lutTicker+" / N"+lutNews + " / " + raspiIP + " / " + version;
	document.getElementById("debug").innerHTML = debugText;
}
