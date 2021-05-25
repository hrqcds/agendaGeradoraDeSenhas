require("dotenv").config()
const express = require("express")
const app = express()
const mongoose = require("mongoose")
mongoose.connect(process.env.CONNECTIONSTRING, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(()=> {
        app.emit("conectando BD")
    })
    .catch(e => console.log(e))
const session = require("express-session")
const MongoStore = require("connect-mongo")
const flash = require("connect-flash")
const router = require("./routes")
const path = require("path")
const helmet = require("helmet")
const csrf = require("csurf")
const {middlewareGlobal, checkCsrfError, csrfMiddleware} = require("./src/middlewares/middleware")

app.use(helmet())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.resolve(__dirname, "public")))

const sessionOptions = session({
    secret: "alegria era o que faltava em mim",
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
})

app.use(sessionOptions)
app.use(flash())

app.set("views", path.resolve(__dirname,"src", "views"))
app.set("view engine", "ejs")


app.use(csrf())
// Nossos proprios middlewares
app.use(middlewareGlobal)
app.use(checkCsrfError)
app.use(csrfMiddleware)
app.use(router)

app.on("conectando BD", ()=>{
    app.listen(5000, ()=>{
        console.log("Ouvindo na porta 5000")
    })
})


