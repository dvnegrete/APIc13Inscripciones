function name (number) {
     return arrayNameMonth[number]
}
const arrayNameMonth = [
    "",
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre"
]
const date = new Date()
const day = date.getDate()
const monthNumber = date.getMonth();
const year = date.getFullYear();
const nameMonth = name(monthNumber)

const monthYear = `${nameMonth}-${year}`
const dateComplete = `${day}-${nameMonth}-${year}`

module.exports = {
    monthYear: monthYear,
    dateComplete: dateComplete
}