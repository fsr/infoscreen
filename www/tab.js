var stopsMin = {"helmholtz":0, "muenchner":6};
var stops = Object.keys(stopsMin);

// last update (text)
var luDVB = 0;
var lutDVB = "";
// ajax requests
var dynamos = new Array();
for(s in stops) dynamos.push(new XMLHttpRequest());

function updateDVB() {
	for(dyn in dynamos) {
		dynamos[dyn].open('GET', 'dvb.fsr?'+stops[dyn]+"&"+stopsMin[stops[dyn]]+"&2");
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
	updateDVB();
	setInterval('updateDVB()', 45000);
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