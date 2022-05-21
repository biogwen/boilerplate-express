let express = require('express');
let app = express();
let static = __dirname + "/public";
let absolute = __dirname + "/views/index.html";
let parser = require('body-parser')

app.use(parser.urlencoded({extended: false}));
app.use(function (req, res, next) {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
})
app.use("/public", express.static(static));


app.get("/",(req,res)=>res.sendFile(absolute));
app.get("/json", (req, res) => {
    const json = { message: "Hello json" };
    json.message = process.env.MESSAGE_STYLE === "uppercase" ? json.message.toUpperCase() : json.message;
    res.json(json);
});

app.get("/now", (req, res, next) => {
        req.time = new Date().toString();
        next();
    },
    (req, res) => res.json({ time: req.time })
);

app.get("/:word/echo",(req,res)=>res.json({echo: req.params.word}));

app.route("/name")
    .get((req, res) => {
        res.json({ name: `${req.query.first} ${req.query.last}` });
    })
    .post((req, res) => {
        res.json({ name: `${req.body.first} ${req.body.last}` });
    })


module.exports = app;