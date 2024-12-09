import * as tf from '@tensorflow/tfjs-node-gpu'
import { Draughts } from 'draughts'
import { convertToTensor, getModel, getMove, saveModel } from './model.js'

function sigmoid(x, k) {
    return 1 / (1 + Math.exp(-x / k));
}

function simpleEval(game) {
    const pos = game.position()
    let rawScore = 0
    for (let i = 0; i < pos.length; i++) {
        switch (pos.charAt(i)) {
            case 'w':
                rawScore += 1
            case 'b':
                rawScore -= 1
        }
    }

    return sigmoid(rawScore, 5)
}

function simpleMove(game, depth=2) {
    if (game.gameOver()) {
        if (game.inDraw()) {
            return {move: undefined, value: 0.5}
        }

        return {move: undefined, value: 0}
    }

    const isWhite = game.turn() == 'w'
    if (depth == 0) {
        return  {move: undefined, value: isWhite ? simpleEval(game) : (1 - simpleEval(game))}
    }

    let best = null
    let bestValue = -Infinity
    game.moves().forEach(move => {
        game.move(move)

        const value = isWhite ? simpleMove(game, depth - 1).value : (1 - simpleMove(game, depth - 1).value)
        if (value > bestValue) {
            best = move
            bestValue = value
        }

        game.undo(move)
    });

    return {move: best, value: bestValue}
}

function getMoveWithRandom(game, model, noModelProbability, randomProbability) {
    if (Math.random() < noModelProbability) {
        if (Math.random() < randomProbability) {
            const moves = game.moves()
            return moves[Math.floor(Math.random() * moves.length)]
        } else {
            return simpleMove(game).move
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
