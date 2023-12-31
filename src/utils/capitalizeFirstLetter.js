// Description: Makes the first letter of a string uppercase
export function capitalizeFirstLetter(inputString) {
    if (typeof inputString !== 'string' || inputString.length === 0) {
        return inputString;
    }
    return inputString.charAt(0).toUpperCase() + inputString.slice(1);
}
