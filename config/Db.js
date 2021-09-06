var mongoose = require("mongoose")

function dbConnection() {
  mongoose.connect(
    `mongodb+srv://ali-abubakr:fe5qRDeqOPL8YZgy@cluster0.usjg1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useFindAndModify: false },
    function (err) {
      if (err) {
        console.log("err", err)
      } else {
        console.log("successfully connected")
      }
    }
  )
}

module.exports = dbConnection
