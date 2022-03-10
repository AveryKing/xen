const isEmpty = (string) => !string.trim().length;

const isEmail = (email) => {
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return email.match(regEx);
};

exports.validateRegistrationData = (data) => {
    const errors = {};
    const userDataArray = Object.entries(data);
    userDataArray.forEach(kv => {
        const currentIndex = userDataArray.indexOf(kv)
        const [key, value] = kv;
        if (isEmpty(value)) errors[key] = 'this field cannot be empty';
        switch (key) {
            case 'email':
                if (!isEmail) errors[key] = 'that email is invalid';
                break;
            case 'handle':
                if (value.length < 3) errors[key] = 'username must be at least 3 characters';
                break;
            case 'password':
                if (value !== userDataArray[currentIndex + 1][1]) {
                    errors[key] = 'the two passwords you entered do not match';
                }
        }
    })

    return {
        errors,
        valid: Object.keys(errors).length === 0
    }
}

exports.validateLoginData = (data) => {
    const errors = {};
    if (isEmpty(data.email)) errors.email = 'Must not be empty';
    if (isEmpty(data.password)) errors.password = "Must not be empty";

    return {
        errors,
        valid: Object.keys(errors).length === 0
    }
}

exports.reduceUserDetails = (data) => {
    const userDetails = {}

    if (!isEmpty(data.bio.trim())) userDetails.bio = data.bio;
    if (!isEmpty(data.website.trim())) {
        userDetails.website = data.website.trim().substring(0, 4) !== 'http'
            ? `http://${data.website.trim()}`
            :  data.website;
    }
    if (!isEmpty(data.location.trim())) userDetails.location = data.location;

    return userDetails;
}