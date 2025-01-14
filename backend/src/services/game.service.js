import {gameModel} from "../models/game.model";

async function createGame(req, res, next) { 
    if(!req.session.userId || !req.session.isAdmin) { 
        return res.status(401).send({msg: "User is not admin"}); 
    }

    const game = await gameModel.create({
        id: await gameModel.count() + 1, 
        name: req.body.name, 
        statementUrl: req.body.statementUrl, 
        renderUrl: req.body.renderUrl
    })

    if(!game) { 
        return res.status(401).send({msg: "Create game failed"}); 
    }

    return res.status(200).send({msg: "created game"}); 
}

function gameInfoRestrictedView(game) { 
    return { 
        id: game.id, 
        name: game.name, 
        statementUrl: game.statementUrl, 
        judgeUrl: game.judgeUrl, 
        renderUrl: game.renderUrl
    }
}

function gameInfoUnrestrictedView(game) { 
    return { 
        id: game.id, 
        name: game.name, 
        statementUrl: game.statementUrl, 
        judgeUrl: game.judgeUrl, 
        renderUrl: game.renderUrl
    }
}

async function getGame(req, res, next) { 
    let gameId = req.params.gameId; 

    if(!gameId) { 
        return res.status(401).send({msg: "GameId missing"}); 
    }

    console.log(gameId)

    const game = await gameModel.findOne({
        id: gameId
    })


    if(!game) { 
        return res.status(401).send({msg: "fetch game failed"}); 
    }
    
    if(!req.session.userId || !req.session.isAdmin) { 
        return res.status(200).send({
            game: gameInfoRestrictedView(game), 
            msg: "fetched game"
        }); 
    }
    else { 
        return res.status(200).send({
            game: gameInfoUnrestrictedView(game), 
            msg: "fetched game"
        }); 
    }

}

export { 
    getGame,
    createGame, 
}