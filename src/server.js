import express from 'express'
import { engine } from 'express-handlebars'
import { Draughts} from 'draughts'
import { loadModel, getMove } from './ai/model.js'

const app = express()
const port = process.env.PORT || 3000

const modelName = 'T1_9'
const model = await loadModel(modelName)

app.engine("handlebars", engine({
    defaultLayout: "main"
}))
app.set("view engine", "handlebars")

app.use(express.json())

app.use(express.static('static'))

app.get('/', function (req, res) {
    console.log("== Recieved index request")
    res.status(200).render("index", {games: 0})
})

app.post('/api/getMove/', function (req, res, next) {
    console.log("== Recieved move request:", req.body)
    let game
    try {
        game = Draughts(req.body.fen)
    } catch (error) {
        console.log("== Couldn't parse")
        res.status(400)
        return
    }

    console.log("== Successfully parsed")
    console.log(game.ascii())

    const move = getMove(model, game).move

    console.log("== Returning move:", move)

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(move))
})

app.listen(port, function () {
    console.log("== Server is listening on port", port)
})
