export const  isValidDate = (dateString) => {
    // Regular expression to match the format dd-MM-yyyy
    const regex = /^(\d{2})-(\d{2})-(\d{4})$/;
    const match = dateString.match(regex);
    
    if (!match) return false;

    // Extract the parts of the date
    const day = parseInt(match[1], 10);
    const month = parseInt(match[2], 10);
    const year = parseInt(match[3], 10);

    // Check the ranges of month and year
    if (month < 1 || month > 12 || year < 1000 || year > 9999) return false;

    // Check the number of days in the month
    const daysInMonth = new Date(year, month, 0).getDate();
    if (day < 1 || day > daysInMonth) return false;

    return true;
}