import * as tf from '@tensorflow/tfjs-node-gpu'
import { Draughts } from 'draughts'
import { convertToTensor, getModel, getMove, saveModel } from './model.js'
import { getSimpleMove } from './simple.js'

function getMoveWithRandom(game, model, noModelProbability, randomProbability) {
    if (Math.random() < noModelProbability) {
        if (Math.random() < randomProbability) {
            const moves = game.moves()
            return moves[Math.floor(Math.random() * moves.length)]
        } else {
            return getSimpleMove(game).move
        }
    } else {
        return getMove(model, game)
    }
}

const modelName = 'T1'
const model = getModel()

const epoches = 10
const matches = 20
const randomDecay = 0.95
let random = 0.9

for (let epoch = 0; epoch < epoches; epoch++) {
    // Maybe use tensor array
    const xs = []
    const yBatches = []
    for (let match = 0; match < matches; match++) {
        const game = Draughts()
        xs.push(convertToTensor(game))
        let currXS = 1

        while (!game.gameOver()) {
            let move = getMoveWithRandom(game, model, random, 1 - random)
            game.move(move)
            xs.push(convertToTensor(game))

            currXS += 1
        }

        const result = game.inDraw() ? 0.5 : (game.turn() == 'w' ? 1 : 0)
        const results = tf.fill([currXS], result)

        yBatches.push(results)
    }

    const train_xs = tf.stack(xs)
    const train_ys = tf.concat(yBatches)

    await model.fit(train_xs, train_ys)
    await saveModel(model, `${modelName}_${epoch}`)

    random *= randomDecay
}
