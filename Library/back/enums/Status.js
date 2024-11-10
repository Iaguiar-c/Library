class Status {
    static STATUS = {
        AVAILABLE: 'AVAILABLE',
        CHECKED_OUT: 'CHECKED_OUT',
        RESERVED: 'RESERVED',
    };

    static isValid(status) {
        return Object.values(Status.STATUS).includes(status);
    }
}

export default Status;
