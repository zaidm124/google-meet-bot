const timing = require('./timetable');

const weekday = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

function getFinalLink () {
    let day = new Date().getDay();
    day = timing[weekday[day]];
    console.log(day);

    const hour = new Date(Date.now()).getHours();
    const min = new Date(Date.now()).getMinutes();
    let currentTime = hour + ':' + min;
    console.log(currentTime);

    currentTime = getTimeAsNumberOfMinutes(currentTime);
    console.log('current time: ', currentTime);
    var finalLink;

    for (let i = 0; i < day.length; i++) {
        var startTime = getTimeAsNumberOfMinutes(day[i].start);
        var endTime = getTimeAsNumberOfMinutes(day[i].end);
        console.log('start time: ', startTime);
        console.log('end time: ', endTime);
        if (startTime <= currentTime && endTime >= currentTime) {
            finalLink = day[i].link;
            console.log(startTime);
            console.log(endTime);
        }
    }
    console.log(finalLink);

    function getTimeAsNumberOfMinutes (time) {
        var timeParts = time.split(':');
        var timeInMinutes = (parseInt(timeParts[0]) * 60) + parseInt(timeParts[1]);
        return parseInt(timeInMinutes);
    }

    return finalLink;
}

module.exports = getFinalLink;
