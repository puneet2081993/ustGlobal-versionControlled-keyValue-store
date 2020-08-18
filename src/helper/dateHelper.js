let isoDate = () => {
    var now = new Date(); // Fri Feb 20 2015 19:29:31 GMT+0530 (India Standard Time)
    var isoDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
    return isoDate
}
module.exports = {
    isoDate
}