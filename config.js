
const password = '8718827411';
const dbname = 'KeepTravellin'
const uriFirst = `mongodb+srv://ABHINAV:${password}@keeptravellin.c5t18.mongodb.net/`
const uriLast = `?retryWrites=true&w=majority`;


module.exports = {
    'uriFirst': uriFirst,
    'uriLast': uriLast,
    'dbname': dbname
}
