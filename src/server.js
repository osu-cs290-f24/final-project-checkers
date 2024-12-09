import express from 'express'
import { engine } from 'express-handlebars'
import { Draughts} from 'draughts'
import { getSimpleMove } from './ai/simple.js'
import fs from 'fs'

const app = express()
const port = process.env.PORT || 3000

let stats = JSON.parse(fs.readFileSync('stats.json'))

app.engine('handlebars', engine({
    defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')

app.use(express.json())

app.use(express.static('static'))

app.get('/', function (req, res) {
    console.log('== Recieved index request')
    res.status(200).render('index', {title: `Wins: ${stats.wins}, Ties: ${stats.ties}, Loses: ${stats.loses}`, 'wins': stats.wins, loses: stats.loses})
})

app.post('/api/getMove/', function (req, res, next) {
    console.log('== Recieved move request:', req.body)
    let game
    try {
        game = Draughts(req.body.fen)
    } catch (error) {
        console.log('== Couldn\'t parse')
        res.status(400)
        return
    }

    console.log('== Successfully parsed')
    console.log(game.ascii())

    if (game.gameOver()) {
        console.log('== Game is over')
        if (game.inDraw()) {
            stats.ties += 1
        } else {
            stats.loses += 1
        }

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(null))
        return;
    }

    const { move, value } = getSimpleMove(game, 4)

    console.log('== Returning move:', move)

    game.move(move)
    if (game.gameOver()) {
        console.log('== Game is over')
        if (game.inDraw()) {
            stats.ties += 1
        } else {
            stats.wins += 1
        }
    }

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(move))
})

app.listen(port, function () {
    console.log('== Server is listening on port', port)
})

app.on('exit', () => {
    fs.writeFileSync('stats.json', JSON.stringify(stats))
});
