export default (dateTime) => {
    const convertedDateTime = new Date(dateTime).toLocaleString("en-GB",
        {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }
    )
    return convertedDateTime
}