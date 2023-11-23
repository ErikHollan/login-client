import Cookies from 'js-cookie';
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const loginRequest = async (email, password) => {
 
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: email,
            password: password
        })
    };

    const response = await fetch(BASE_URL + '/login', requestOptions);
    const responseObject = await response.json();

    if (response.ok) {
        Cookies.set('jwtToken', responseObject.token);
        console.log("Login successful - token stored");
    }
    return responseObject
};


export const registrationRequest = async (firstname, lastname, password, email) => {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            firstName: firstname,
            lastName: lastname,
            password: password,
            email: email
        })
    };

    const response = await fetch(BASE_URL + '/registration', requestOptions);
    const responseObject = await response.json();
    return responseObject;

};


export const getUserEmailFromToken = async (token) => {
    const response = await fetch(BASE_URL +'/check?token='+token);
    const responseObject = await response.json();
    return responseObject;
};