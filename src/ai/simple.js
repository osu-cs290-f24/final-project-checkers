function simpleEval(game) {
    const pos = game.position()
    let score = 0
    for (let i = 0; i < pos.length; i++) {
        switch (pos.charAt(i)) {
            case 'w':
                score += 1
            case 'b':
                score -= 1
            case 'W':
                score += 5
            case 'B':
                score -= 5
        }
    }

    return score
}

function simpleMove(game, color, depth) {
    if (game.gameOver()) {
        if (game.inDraw()) {
            return {move: undefined, value: 0}
        }

        const value = (game.turn() == 'w') ? -Infinity : Infinity
        return {move: undefined, value: color * value}
    }

    if (depth == 0) {
        return  {move: undefined, value: color * simpleEval(game)}
    }

    let best = null
    let bestValue = NaN
    game.moves().forEach(move => {
        game.move(move)

        const value = -simpleMove(game, -color, depth - 1).value
        // Not is for the NaN
        if (!(value <= bestValue)) {
            best = move
            bestValue = value
        }

        game.undo(move)
    });

    return {move: best, value: bestValue}
}

export function getSimpleMove(game, depth=2) {
    return simpleMove(game, game.turn() == 'w' ? 1 : -1, depth)
}
