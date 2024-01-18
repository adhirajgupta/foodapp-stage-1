import Image1 from '../assets/Week_1_menu_page-0001.jpg';
import Image2 from '../assets/Week_1_menu_page-0002.jpg';
import Image3 from '../assets/Week_1_menu_page-0003.jpg';
import { getFirestore, collection, addDoc, deleteDoc, query, where, doc, getDocs } from 'firebase/firestore';
import db from '../config'
export const imagePaths = [
    "https://raw.githubusercontent.com/adhirajgupta/foodapp-stage-1/master/public/Week_1-01.jpg",
    "https://raw.githubusercontent.com/adhirajgupta/foodapp-stage-1/master/public/Week_1-02.jpg",
    "https://raw.githubusercontent.com/adhirajgupta/foodapp-stage-1/master/public/Week_1-03.jpg",
    "https://raw.githubusercontent.com/adhirajgupta/foodapp-stage-1/master/public/Week_2-01.jpg",
    "https://raw.githubusercontent.com/adhirajgupta/foodapp-stage-1/master/public/Week_2-02.jpg",
    "https://raw.githubusercontent.com/adhirajgupta/foodapp-stage-1/master/public/Week_2-03.jpg",
    "https://raw.githubusercontent.com/adhirajgupta/foodapp-stage-1/master/public/Week_3-01.jpg",
    "https://raw.githubusercontent.com/adhirajgupta/foodapp-stage-1/master/public/Week_3-02.jpg",
    "https://raw.githubusercontent.com/adhirajgupta/foodapp-stage-1/master/public/Week_3-03.jpg"
];

export const extractLastSegment = (url) => {
    const segments = url.split('/');
    const lastSegment = segments[segments.length - 1];
    return decodeURIComponent(lastSegment);
};


const generateUniqueId = () => {
    // Youg can use a library like uuid to generate a unique ID
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





export const addToDeclinedCollection = async (approved, description, votes, progress, suggestion, onVoteCallback) => {
    const firestore = getFirestore(db);
    const DeclinedRef = collection(firestore, 'Declined');
    const SuggestionsRef = collection(firestore, 'Suggestions');
    const querySnapshot = query(SuggestionsRef, where("suggestion", "==", suggestion), where("description", "==", description));
    const docId = (await getDocs(querySnapshot)).docs[0].id;
    // const suggestionDoc = doc(SuggestionsRef, docId);

    try {
        // Generate a random doc id for the 'Declined' collection
        const randomDocId = Math.random().toString(36).substring(7);

        // Add the document to the 'Declined' collection
        await addDoc(DeclinedRef, {
            approved: approved,
            description: description,
            votes: votes,
            // progress: progress,
            suggestion: suggestion,
            // Additional fields or modifications can be made here
        });

        console.log('Document added to Declined collection successfully.');

        // Delete the document from the 'Suggestions' collection
        await deleteDoc(doc(SuggestionsRef, docId));

        console.log('Document deleted from Suggestions collection successfully.');
        onVoteCallback()
        alert("This suggestion has been successfully declined")
        return "Success";
    } catch (error) {
        console.error('Error:', error);
        return "Error";
    }
};

