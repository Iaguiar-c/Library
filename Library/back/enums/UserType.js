class UserType {
    static USERTYPE = {
        ADMIN: 'a', 
        CLIENT: 'c'
    };

    static isValid(usertype) {
        return Object.values(UserType.USERTYPE).includes(usertype);
    }
}

export default UserType;
