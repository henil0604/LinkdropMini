let STARTING_TIME = Date.now();


let express = require("express"),
    bodyParser = require("body-parser"),
    cookieParser = require("cookie-parser"),
    path = require("path"),
    app = express(),
    utils = require("./node/utils")


app.set("view engine", "ejs");
app.set("views", 'views')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser());

app.use("/assets", express.static(path.join(__dirname, "/assets")))
app.use("/uploads", express.static(path.join(__dirname, "/uploads")))


app.use("/api", require("./api/index.js"))


app.get("/d/:zipId", (req, res) => {
    res.render("download", { zipId: req.params.zipId })
})

app.get("/", (req, res) => {
    res.render("index")
})


app.listen(process.env.PORT || utils.config.server.PORT, () => {

    console.log(`
        - Listening on Port ${process.env.PORT || utils.config.server.PORT}
            http://127.0.0.1:${process.env.PORT || utils.config.server.PORT}
            http://localhost:${process.env.PORT || utils.config.server.PORT}

        - Took ${Date.now() - STARTING_TIME}ms to Load Up
    `)


})