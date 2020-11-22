/**
 * Function takes a date string and returns a Date object
 * @param {String} dateString Input date string in YYYY-MM-DD format
 * @returns {Date} Date object with time set to midnight
 */
export const convertDateStringToDateObject = (dateString) => {
    dateString = dateString.split("-")
    let year = dateString[0]
    let month = dateString[1]
    let day = dateString[2]

    let newDate = new Date()
    newDate.setDate(parseInt(day))
    newDate.setMonth(parseInt(month) - 1)
    newDate.setFullYear(parseInt(year))
    newDate.setHours(0)
    newDate.setMinutes(0)
    newDate.setSeconds(0)

    return newDate
}
/**
 * Function takes in Date object and converts it to YYYY-MM-DD format
 * @param {Date} date The date to be converted to String for input fields
 * @returns {String} Date in YYYY-MM-DD format
 */
export const convertDateObjectToDateString = (date) => {
    return date.getFullYear() + "-" + (date.getMonth() < 9 ? "0" : "") + (date.getMonth() + 1).toString() + "-" + (date.getDate() < 10 ? "0" : "") + date.getDate()
}

export const getAgeFromDateOfBirth = (birthday) => {
    let ageDifference = Date.now() - birthday
    let ageDate = new Date(ageDifference)

    return (Math.abs(ageDate.getUTCFullYear() - 1970))
}

/**
 * Function to convert Firestore Timestamp to string (date)
 * @param {Firestore.Timestamp} timestamp - Firestore timestamp to be converted
 * @returns {String} Returns date string
 */
export const convertTimeStampToDateString = (timestamp) => {
    //Check if timestamp exists
    if (timestamp === undefined || timestamp === null) {
        return ""
    } else {
        var date = new Date(0);
        var seconds = timestamp.seconds
        date.setUTCSeconds(seconds)
        return date.toDateString()
    }
}

export const convertTimeStampToDateObject = (timestamp) => {
    let date = new Date(0);
    var seconds = timestamp.seconds
    date.setUTCSeconds(seconds)
    return date
}