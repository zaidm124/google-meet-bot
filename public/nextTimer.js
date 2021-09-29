// console.log('working');

function timeLeft () {
    let liveTime;
    liveTime = new Date();
    let currentTime = `${liveTime.getDay()}:${liveTime.getHours()}:${liveTime.getMinutes()}:${liveTime.getSeconds()}`;
    currentTime = getTimeasNumberOfSeconds(currentTime);
    const nextClass = getCurrentClass();
    console.log(nextClass);
    let nextTime = getTimeasNumberOfSeconds(nextClass);
    console.log('next time', nextTime);
    // console.log('current time', currentTime);
    let distance = nextTime - currentTime;
    let days, hr, min, ss;
    days = Math.floor(distance / (24 * 60 * 60));
    hr = Math.floor((distance % (24 * 60 * 60)) / (60 * 60));
    min = Math.floor((distance % (60 * 60)) / 60);
    ss = Math.floor(distance % (60));

    console.log(days + ':' + hr + ':' + min + ':' + ss);
    if (currentTime <= nextTime) {
        document.getElementById('day').innerHTML = days + ':';
        document.getElementById('hr').innerHTML = hr + ':';
        document.getElementById('min').innerHTML = min + ':';
        document.getElementById('ss').innerHTML = ss;
    }

    function getTimeasNumberOfSeconds (time) {
        var timeParts = time.split(':');
        var timeInSeconds = (parseInt(timeParts[0]) * 24 * 60 * 60) + (parseInt(timeParts[1]) * 60 * 60) + (parseInt(timeParts[2]) * 60) + (parseInt(timeParts[3]));
        return parseInt(timeInSeconds);
    }

}

setInterval(timeLeft, 1000);
