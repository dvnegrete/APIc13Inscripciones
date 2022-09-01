class MyDate {
    constructor(){}
    arrayNameMonth = [    
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
    ];
    
    name (number) {
        return arrayNameMonth[number]
   }

   timeStampt() {
   const date = new Date();
   const day = date.getDate()
   const monthNumber = date.getMonth();
   const year = date.getFullYear();
   const nameMonth = name(monthNumber)
   const hours = date.getHours();
   const minutes = date.getMinutes();
   const minutesFormat = minutes.toString().length === 1 ? `0${minutes}` : minutes;
   
   // const monthYear = `${nameMonth}-${year}`
   // const dateComplete = `${day}-${nameMonth}-${year}`
   const timeStamptFormat = `${day}-${nameMonth}-${year} ${hours}:${minutesFormat}`
   return timeStamptFormat;   
   }

}

// function name (number) {
//      return arrayNameMonth[number]
// }
// const arrayNameMonth = [    
//     "enero",
//     "febrero",
//     "marzo",
//     "abril",
//     "mayo",
//     "junio",
//     "julio",
//     "agosto",
//     "septiembre",
//     "octubre",
//     "noviembre",
//     "diciembre"
// ]
// function timeStampt() {
// const date = new Date();
// const day = date.getDate()
// const monthNumber = date.getMonth();
// const year = date.getFullYear();
// const nameMonth = name(monthNumber)
// const hours = date.getHours();
// const minutes = date.getMinutes();
// const minutesFormat = minutes.toString().length === 1 ? `0${minutes}` : minutes;

// // const monthYear = `${nameMonth}-${year}`
// // const dateComplete = `${day}-${nameMonth}-${year}`
// const timeStamptFormat = `${day}-${nameMonth}-${year} ${hours}:${minutesFormat}`
// return timeStamptFormat;   
// }


module.exports = {
    // monthYear: monthYear,
    // dateComplete: dateComplete,
    MyDate
}