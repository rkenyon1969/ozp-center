'use strict';

module.exports = function timeAgo (date) {
    date = date.replace('+0000', 'Z');
    date = new Date(date).getTime();
    var timeDiff = (Date.now() - date) / 1000;
    var timePassed, quantity;

    if(timeDiff < 60) {
        quantity = 'second';
        timePassed = timeDiff;
    }
    timeDiff /= 60;
    if(timeDiff < 60 && !timePassed) {
        quantity = 'minute';
        timePassed = timeDiff;
    }
    timeDiff /= 60;
    if(timeDiff < 24 && !timePassed) {
        quantity = 'hour';
        timePassed = timeDiff;
    }
    timeDiff /= 24;
    if(timeDiff < 7 && !timePassed) {
        quantity = 'day';
        timePassed = timeDiff;
    }
    timeDiff /= 7;
    if(timeDiff < 4 && !timePassed) {
        quantity = 'week';
        timePassed = timeDiff;
    }
    timeDiff = (timeDiff / 52) * 12;
    if(timeDiff < 11.5 && !timePassed) {
        quantity = 'month';
        timePassed = timeDiff;
    } else if (!timePassed) {
        quantity = 'year';
        timePassed = timeDiff / 12;
    }

    timePassed = Math.round(timePassed);

    if(timePassed === 1) {
        return 'a ' + quantity + ' ago';
    }

    return timePassed + ' ' + quantity + 's ago';
};
