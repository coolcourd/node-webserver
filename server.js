const express = require("express")
const hbs = require("hbs")
const fs = require("fs")

var app = express()

const port = process.env.PORT || 3000

hbs.registerPartials(`${__dirname}/views/partials`)
app.set("view engine", "hbs");

app.use((req, res, next) => {
    var now = new Date().toString()
    var log = `${now}: ${req.method} ${req.url}`

    console.log(log)
    fs.appendFile("server.log", log + "\n", (err) => {
        if (err) {
            console.log("Unable to append to serve.log")
        }
    })
    next()
})

// app.use((req, res, next) => {
//     res.render("maint.hbs")
// })

app.use(express.static(`${__dirname}/public`))

hbs.registerHelper("screamIt", (text) => {
    return text.toUpperCase()
})

hbs.registerHelper("getCurrentYear", () => {
    return new Date().getFullYear()
})

app.get('/', (req, res) => {
    // res.send("<h1>Hello Express</h1>")
    res.render("home.hbs", {
        pageTitle: "Home page",
        welcomeMessage: "Courd is Great!"
    })
})

app.get('/about', (req, res) => {
    res.render("about.hbs", {
        pageTitle: "About page",
    })
})

app.get('/projects', (req, res) => {
    res.render("projects.hbs", {
        pageTitle: "Projects page",
    })
})

app.get('/bad', (req, res) => {
    res.send({
        error: "error handeling request"
    })
})

app.listen(port, () => {
    console.log(`server is up on port ${port}`)
})