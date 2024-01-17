const validateName = (value) => {
    if (value === '') return "Your game needs a name"; 
    if (!(/^[a-zA-Z0-9\s\-/]+$/).test(value))return "Special character not allowed"
    if (value.length > 30) return "Max 30 characters"; 
    if (value.length < 4) return "The name has to be over 5 characters"
    return '';
};

const validateReleased = (value) => {
    const valueDate = new Date(value);
    const valueYear = valueDate.getFullYear();
    const minYear = 1950;
    const maxYear = new Date().getFullYear();

    if (!value) return "Required field";
    if (valueYear < minYear) return "The year can't be earlier than 1950"; 
    if (valueYear > maxYear) return "The year can't be greater than the current year"; 
    return '';
};

const validateRating = (value) => {
    const decimal = value.split(".")[1];
    const decimalCount = decimal ? decimal.length : 0; 
    const valueParsed = Number(value);

    if (value === '') return "Required field";
    if (valueParsed < 1) return "Min value: 1";
    if (valueParsed > 5) return "Max value: 5"; 
    if (decimalCount > 2) return "Max 2 decimals";
    return '';
};

const validateImage = (value) => {    
    const urlRegex = /(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/i
    if (value === '') {
        return "Required field"; 
    } else if (!urlRegex.test(value)) {
        return "Invalid URL"; 
    } else {
        return ""; 
    }
};

const validateDescription = (value) => {
    if (value === '') return "Required field"; 
    if (value.length > 1000) return "Max 1000 characters"; 
    return ""; 
};

export const validateGenres = (updatedGenres) => {
    if (!updatedGenres.length) return "Chose at least one genre.";
    return "";
};

export const validatePlatforms = (platforms) => {
    if(!platforms.length) return "Chose at least one platform.";
    return "";
};

export const validateSubmit = (vg, errors) => {
    const requiredFields = vg.name === '' || vg.image === '' || vg.description === '' || vg.released === '' || vg.rating === '' || vg.platforms[0] === '' || vg.genres.length === 0 
        ? "Please complete all the fields." 
        : ""

    const fixErrors = Object.values(errors).some(error => error !== '') 
        ? "Please fix the errors." 
        : ""

    const errorMessage = requiredFields || fixErrors 
        ? `${requiredFields} ${fixErrors}` 
        : null;
    return errorMessage; 
};


const validationFunctions = {
    name: validateName,
    image: validateImage,
    description: validateDescription,
    released: validateReleased,
    rating: validateRating,
    platforms: validatePlatforms,
    genre: validateGenres

};

export default validationFunctions;