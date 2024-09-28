export const storeJsonData = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value)); // Use JSON.stringify to store objects or arrays
};

export const readJsonData = (key) => {
    const storedValue = localStorage.getItem(key);
    if (storedValue) {
        return JSON.parse(storedValue); // Use JSON.parse to convert the string back into an object/array
    }
    return null; // Return null if no data is found
};

export const  readData = (key) => {
   return localStorage.getItem(key);
}
export const storeData = (key, value) => {
    localStorage.setItem(key, value); // Use JSON.stringify to store objects or arrays
};