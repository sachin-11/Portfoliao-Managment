const express = require("express")
const dotenv = require("dotenv")
const logger = require("./middleware/logger")
const morgan = require("morgan")
const colors = require("colors")
const connectDB = require("./config/db")
const errorHandler = require("./middleware/error")
//load env vars

dotenv.config({ path: "./config/config.env" })

//connect to db
connectDB()

//route file
const bootcamps = require("./router/bootcamps")

const app = express()

//body-parser
app.use(express.json())

//dev logging middleware

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"))
}

//router
app.use("/api/v1/bootcamps", bootcamps)

app.use(errorHandler)

const PORT = process.env.PORT || 3000

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)

//handle unhandle promise rejection

process.on("unhandledRejection", (err, promise) => {
  console.log(`Eror: ${err.message}`)
  //close server
  server.close(() => process.exit(1))
})
