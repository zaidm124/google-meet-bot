const timing = require('../timetable');
const weekday = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
const  link = require('../link');

function liveTimer () {
    let liveTime;
    let hr, min, ss;
    hr = new Date(Date.now()).getHours();
    min = new Date(Date.now()).getMinutes();
    ss = new Date(Date.now()).getSeconds();
    liveTime = `${hr}:${min}:${ss}`;
    console.log(liveTime);
    let day = new Date(Date.now()).getDay();
    day = timing[weekday[day]];
    // console.log(day);
    // console.log(day.length);
    for (let i = 0; i < day.length; i++) {
        if (day[i].start === liveTime) {
            const meetLink = day[i].link;
            link(meetLink);
        }
    }
}

module.exports=liveTimer;

// setInterval(liveTimer, 1000);
