import Image1 from '../assets/Week_1_menu_page-0001.jpg';
import Image2 from '../assets/Week_1_menu_page-0002.jpg';
import Image3 from '../assets/Week_1_menu_page-0003.jpg';

export const imagePaths = [
    Image1,
    Image2,
    Image3,
    Image1,
    Image2,
    Image3,
    Image1,
    Image2,
    Image3
];

export const extractLastSegment = (url) => {
    const segments = url.split('/');
    const lastSegment = segments[segments.length - 1];
    return decodeURIComponent(lastSegment);
};


const generateUniqueId = () => {
    // You can use a library like uuid to generate a unique ID
    // For simplicity, here's a basic example
    const date = new Date().toISOString();
    const random = Math.random().toString(36).substring(2, 15);
    return `${date}-${random}`;
};

const setCookie = (name, value, days) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
};

export const getCookie = (name) => {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : null;
};

export const checkAndSetCookie = () => {
    const existingCookie = getCookie('uniqueId');

    if (!existingCookie) {
        const uniqueId = generateUniqueId();
        setCookie('uniqueId', uniqueId, 365); // Set the cookie to expire in 365 days
        return uniqueId
    }
    return existingCookie

};
