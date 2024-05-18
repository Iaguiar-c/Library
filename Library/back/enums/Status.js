class Status {
    static STATUS = {
        TO_READ: 'to-read',
        READING: 'reading',
        READ: 'read',
    };

    static isValid(status) {
        return Object.values(Status.STATUS).includes(status);
    }
}

export default Status;
