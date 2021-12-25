const getFormattedTimeFromDate = (date) => {
    let orginalDate = date.toJSON().slice(0, 10);
    let formattedDate = date.getDate() + '/'
        + orginalDate.slice(5, 7) + '/'
        + orginalDate.slice(0, 4);
    return formattedDate;
}

export default getFormattedTimeFromDate;