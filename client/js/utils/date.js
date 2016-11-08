function pad(number) {
    return number < 10 ? `0${number}` : number;
}

export default {
    toTS(date, time) {
        if (time) {
            return Date.parse(`${date} ${time}`);
        }

        return Date.parse(date);
    },

    fromTS(ts) {
        const date = ts ? new Date(ts) : new Date;
        const year = date.getFullYear();
        const month = pad(date.getMonth() + 1);
        const day = pad(date.getDate());
        const hours = pad(date.getHours());
        const minutes = pad(date.getMinutes());

        return {
            date(normalize) {
                return normalize
                    ? `${day}-${month}-${year}`
                    : `${year}-${month}-${day}`
            },

            time() {
                return `${hours}:${minutes}`;
            }
        };
    },

    currentDate() {
        return this.fromTS().date();
    },

    currentTime() {
        return this.fromTS().time();
    }
};