const db = require("../../db/connection");

// const selectTopics = () => {
//     return db.query(`SELECT * FROM topics;`)
//     .then((result) => {
//       console.log(result, "<<< result of db query from model")  
//     })
// }

module.exports = {selectTopics}