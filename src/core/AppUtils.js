import dateFormat from "dateformat";

export const Store = {
    set: (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    },
    get: (key) => {
        return JSON.parse(localStorage.getItem(key));
    },
    contains: (key) => {
        return localStorage.getItem(key) !== null;
    },
    remove: (key) => {
        localStorage.removeItem(key);
    }
}

export const EventBus = {

    $on(eventType, callback) {
        document.addEventListener(eventType, (ev) => callback(ev.detail))
    },

    $dispatch(eventType, data) {
        const event = new CustomEvent(eventType, {detail: data})
        document.dispatchEvent(event)
    },

    $remove(eventType, callback) {
        document.removeEventListener(eventType, callback)
    }
}

export const formatCallFromSeconds = (seconds) => {
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds - (hours * 3600)) / 60);
    seconds = seconds - (hours * 3600) - (minutes * 60);
    let time = "";

    if (hours !== 0) {
        time = hours + ":";
    }
    if (minutes !== 0 || time !== "") {
        minutes = (minutes < 10 && time !== "") ? "0" + minutes : String(minutes);
        time += minutes + ":";
    }
    if (time === "") {
        time = seconds + "s";
    } else {
        time += (seconds < 10) ? "0" + seconds : String(seconds);
    }
    return time;
}

export function getTimeIntervalBetweenDatesSplitBySeconds(startDate, endDate, interval) {
    let tempDate = new Date(startDate);

    const result = []
    do {
        result.push(formatDateTime(tempDate, 'HH:MM:ss'))
        tempDate.setSeconds(tempDate.getSeconds() + interval)
    } while (tempDate < endDate);

    return result
}

export function formatDateTime(date, format = "yyyy-mm-dd HH:MM:ss") {
    return dateFormat(date, format);
}

export function getSecondsBetweenDates(startDate, endDate) {
    return Math.floor((endDate - startDate) / 1000);
}
