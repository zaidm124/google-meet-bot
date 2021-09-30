const weekday = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

// document.write('<script type="text/javascript" src="../timetable.js" ></script>');

console.log(weekday);

function getCurrentClass () {
    let day = new Date().getDay();
    let numberOfDay = new Date().getDay();

    day = timing[weekday[day]];
    // console.log(day);
    const hour = new Date(Date.now()).getHours();
    const min = new Date(Date.now()).getMinutes();
    const ss = new Date(Date.now()).getSeconds();

    let currentTime = numberOfDay + ':' + hour + ':' + min + ':' + ss;
    // console.log(currentTime);

    currentTime = getTimeasNumberOfSeconds(currentTime);
    // console.log('current time: ', currentTime);

    const sentence = document.getElementById('sentence');
    const current = document.getElementById('current');
    const button = document.getElementById('button');

    const nextClass = [];

    var subjectName;
    for (let i = 0; i < day.length; i++) {
        var startTime = getTimeasNumberOfSeconds(numberOfDay + ':' + day[i].start);
        var endTime = getTimeasNumberOfSeconds(numberOfDay + ':' + day[i].end);
        // console.log('start time: ', startTime);
        // console.log('end time: ', endTime);
        if (startTime <= currentTime && endTime >= currentTime) {
            subjectName = day[i].subject;
            // console.log(startTime);
            // console.log(endTime);
        }
        if (startTime > currentTime && endTime > currentTime) {
            nextClass.push(day[i]);
        }
    }

    if (!nextClass.length) {
        if(numberOfDay===6){
            numberOfDay=-1;
        }
        let nextDay = timing[weekday[numberOfDay + 1]];
        for (let i = 0; i < nextDay.length; i++) {
            var startTime = getTimeasNumberOfSeconds((numberOfDay + 1) + ':' + nextDay[i].start);
            var endTime = getTimeasNumberOfSeconds((numberOfDay + 1) + ':' + nextDay[i].end);
            // console.log('start time: ', startTime);
            // console.log('end time: ', endTime);
            if (startTime <= currentTime && endTime >= currentTime) {
                subjectName = day[i].subject;
                // console.log(startTime);
                // console.log(endTime);
            }
            if (startTime > currentTime && endTime > currentTime) {
                nextClass.push(nextDay[i]);
            }
        }
    }

    // console.log(subjectName);
    if (subjectName) {
        sentence.innerHTML = 'The class going on is:';
        current.style.display = 'inherit';
        button.style.display = 'inherit';
        current.innerHTML = subjectName;
    } else {
        sentence.innerHTML = 'You do not have any class now';
        current.style.display = 'none';
        button.style.display = 'none';
    }

    function getTimeasNumberOfSeconds (time) {
        var timeParts = time.split(':');
        var timeInSeconds = (parseInt(timeParts[0]) * 24 * 60 * 60) + (parseInt(timeParts[1]) * 60 * 60) + (parseInt(timeParts[2]) * 60) + (parseInt(timeParts[3]));
        return parseInt(timeInSeconds);
    }

    return nextClass[0];

}

setInterval(getCurrentClass, 1000);
