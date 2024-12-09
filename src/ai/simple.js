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

export function simpleMove(game, depth=2) {
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
