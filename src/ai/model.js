import * as tf from '@tensorflow/tfjs-node-gpu'
import { Draughts } from 'draughts'

const tiles = 50
const pieceMap = {'W': 0, 'w': 1, '0': 2, 'B': 3, 'b': 4}
const states = Object.keys(pieceMap).length

function getModel() {
    const model = tf.sequential({
        layers: [
            tf.layers.dense({inputShape: [tiles, states], units: 1024, activation: 'relu'}),
            tf.layers.flatten(),
            tf.layers.dense({units: 512, activation: 'relu'}),
            tf.layers.dense({units: 512, activation: 'relu'}),
            tf.layers.dense({units: 256, activation: 'relu'}),
            tf.layers.dense({units: 1, activation: 'softmax'})
        ]
    })

    model.compile({
        optimizer: 'adam',
        loss: 'meanSquaredError'
    })

    return model
}

function convertToTensor() {
    // Position is undocumented but is a string of all the squares with w: white, W: king white, 0: blank ...
    const gameState = Draughts().position().slice(1).split('').map(char => pieceMap[char])
    return tf.oneHot(tf.tensor(gameState, [tiles], 'int32'), states);
}

function getMove(model, game) {
    const moves = game.moves()

    if (moves.length == 0) {
        return { undefined, undefined }
    }

    const inputs = game.moves().map(move => {
        game.move(move)
        const state = convertToTensor(game)
        game.undo()
        return state
    })
    const output = model.predict(tf.stack(inputs))
    const index = tf.argMax(output).arraySync()

    return {move: moves[index], value: output.arraySync()[index]}
}
