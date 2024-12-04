/*
 * Write your routing code in this file.  Make sure to add your name and
 * @oregonstate.edu email address below.
 *
 * Name: Kai Turner
 * Email: turnekai@oregonstate.edu
 * Name: Dominick Dorantes
 * Email: doranted@oregonstate.edu
 * Name:
 * Email:
 * Name:
 * Email: 
 */

let express = require('express')
let exphbs = require('express-handlebars')
let draughts = require('draughts');

let app = express()
let port = process.env.PORT || 3000

app.engine("handlebars", exphbs.engine({
    defaultLayout: "main"
}))
app.set("view engine", "handlebars")

app.use(express.static('static'))

app.get('/', function (req, res) {
    console.log("== Recieved index request")
    res.status(200).render("index", {games: 0})
})

app.post('/api/getMove/', function (req, res, next) {
    console.log("== Recieved move request:", req.body)
    try {
        game = checkers.Draughts(req.body)
    } catch (error) {
        console.log("== Couldn't parse")
        res.status(400)
        return
    }

    console.log("== Successfully parsed")

    let moves = draughts.moves()
    let move = moves[Math.floor(Math.random() * moves.length)]

    console.log("== Returning move:", move)

    res.body = move
    res.status(200)
})

app.listen(port, function () {
    console.log("== Server is listening on port", port)
})
