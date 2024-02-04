const doLogIn = (user) => {
    localStorage.setItem('user', user);
    localStorage.setItem('isLoggedIn', true);
};

const isLoggedIn = () => {
    return Boolean(localStorage.getItem('isLoggedIn'));
};

const logOut = (props) => {
    window.location.href = '/login';

    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    if (JSON.parse(localStorage.getItem('user'))?.user?.roleId === 1) {
        window.location.href = '/admin/login';
    } else {
        window.location.href = '/login';
    }
};

const validatePassword = (password) => {
    // Regular expression for password validation (4 to 20 characters)
    const passwordRegex = /^.{4,20}$/;

    const isValid = passwordRegex.test(password);

    if (isValid) {
        return false;
    } else {
        return 'Enter password between 4-20 characters';
    }
};

const isValidURL = (link) => {
    const regex =
        /^(http:\/\/www\.|https:\/\/www\.|ftp:\/\/www\.|http:\/\/|https:\/\/|ftp:\/\/)?[a-zA-Z0-9@:%_\.\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/i;
    const isValid = regex.test(link);
    if (isValid) {
        return false;
    } else {
        return 'Link is not valid';
    }
};

const validateEmail = (email) => {
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const isValid = emailRegex.test(email);

    if (isValid) {
        return false;
    } else if (email.length < 1) {
        return 'Please enter a email';
    } else {
        return 'Email is not valid';
    }
};

export default {
    doLogIn,
    isLoggedIn,
    logOut,
    validatePassword,
    validateEmail,
    isValidURL,
};
