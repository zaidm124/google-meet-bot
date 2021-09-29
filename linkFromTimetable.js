const timing = require('./timetable');

const weekday = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

function getFinalLink () {
    let day = new Date().getDay();
    day = timing[weekday[day]];
    console.log(day);

    const hour = new Date(Date.now()).getHours();
    const min = new Date(Date.now()).getMinutes();
    const ss=new Date(Date.now()).getSeconds()
    let currentTime = hour + ':' + min+':'+ss;
    console.log(currentTime);

    currentTime = getTimeasNumberOfSeconds(currentTime);
    console.log('current time: ', currentTime);
    var finalLink;

    for (let i = 0; i < day.length; i++) {
        var startTime = getTimeasNumberOfSeconds(day[i].start);
        var endTime = getTimeasNumberOfSeconds(day[i].end);
        console.log('start time: ', startTime);
        console.log('end time: ', endTime);
        if (startTime <= currentTime && endTime >= currentTime) {
            finalLink = day[i].link;
            console.log(startTime);
            console.log(endTime);
        }
    }
    console.log(finalLink);

    function getTimeasNumberOfSeconds (time) {
        var timeParts = time.split(':');
        var timeInSeconds = (parseInt(timeParts[0]) * 60 * 60) + (parseInt(timeParts[1]) * 60) + (parseInt(timeParts[2]));
        return parseInt(timeInSeconds);
    }

    return finalLink;
}

getFinalLink();

module.exports = getFinalLink;
