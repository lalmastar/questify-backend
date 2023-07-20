const express = require("express");
const app = express()
const cors = require("cors")
const helmet = require("helmet");
require("dotenv").config()
const cookieParser = require("cookie-parser")

const jwtVerify = require("./middleware/jwtVerify")
const corsOptions = require("./config/corsOptions");

const connectMongo = require("./config/connDB")
const morgan = require('morgan');


app.use(helmet())
app.use(cors({
    origin: corsOptions,
    optionsSuccessStatus:200,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['X-PINGOTHER', 'Content-Type',"Authorization","Origin", 'HEAD', 'OPTIONS',"Accept","Cache-Control",'Cookie','X-Requested-With'],
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use("/api/auth/v4",require("./routes/userAuth.route"))
app.use("/api/question",jwtVerify,require("./routes/question.route"))
app.use("/api/answer",jwtVerify,require("./routes/answer.route"))
app.use("/api/all_queries",jwtVerify,require("./routes/allQueries.route"))
app.use("/user",jwtVerify,require("./routes/user.route"))

app.listen(process.env.PORT,async ()=>{
    await connectMongo();
    console.log(`server is running on PORT ${process.env.PORT} http://localhost:3500`)
})