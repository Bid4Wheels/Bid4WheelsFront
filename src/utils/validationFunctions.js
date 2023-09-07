export const validatePassword = (password) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
};

export const validatePhoneNumber = (phoneNumber) => {
    return /^[0-9+]{14,}$/.test(phoneNumber);
};

export const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
};
