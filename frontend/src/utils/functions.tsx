

// takes a string of the form "2023-07-30T05:00:00Z" to the form "Thu, 01 Jan 1970 00:00:00 GMT"
export const stringToReadableDate = (inputString: string) => {
    let date = new Date(inputString)
    return date.toUTCString()
    // 2023-07-30T14:24:07.407482Z	
    // 2023-07-30T05:00:00Z	
}
