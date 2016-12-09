var request = require("request");

var url = 'https://api.meetup.com/2/open_events?key=54077737e64536329137b12472e4e53&sign=true&photo-host=public&country=us&city=Sacramento&state=ca&page=20';
var html = '';

function handleData(data) {
    var meetings = JSON.parse(data).results;
    var dateFlag = '';
    for (var i = 0; i < meetings.length; i++) {
        var meet = meetings[i];
        var date = new Date(meet.time);
        var mydate = date.getFullYear() + '/' + date.getMonth() + '/' + date.getDate();
        if (dateFlag != mydate) {
            dateFlag = mydate;
            html += `<h2>${mydate}</h2>`;
        }
        var block = "<div>";
        block += `<h3>${mydate}</h3>`;
        block += `<div class="header">${meet.name}</div>`;
        block += `<div class="address">${meet.venue?meet.venue.address_1:''}</div>`;
        block += `<div class="descr">${meet.description}</div>`;
        block += "</div>";
        html += block;


    }

    console.log(html)
}

request(url, (error, response, body) => {
    if (!error) {
        handleData(body);
    } else {
        console.log(error);
    }
});
