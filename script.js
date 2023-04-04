// the gameboard
const gameBoard = (() => {
    const gameBoardArray = new Array(9);

    const updateBoard = (location) => {
        gameBoardArray[location] = player.type;
    }
    const resetBoard = () => {
        gameBoardArray = undefined; 
    }
    
    return {gameBoardArray, updateBoard, resetBoard};
})();

// controls the webpage display
const displayController = (() => {
    const _gameBoardPieces = document.querySelectorAll(".board-piece");
    const _x = document.getElementById("x-button");
    const _o = document.getElementById("o-button");

    const updateBoard = (location) => {
        _gameBoardPieces[location].textContent = player.type;
    }

    const resetDOMBoard = () => {
        for (boardPiece in _gameBoardPieces) {
            boardPiece.textContent = "";
        }
    } 

    _x.addEventListener("click", (e) => {
        gameController.startGame(_x);
    });

    _o.addEventListener("click", (e) => {
        gameController.startGame(_o);
    });

    
    return {updateBoard, resetDOMBoard};
})();

// controls the game
const gameController = (() => {
    
    const startGame = (player) => {
        boardPiece.textContent = player.type;
        gameBoard.updateBoard(index);
        displayController.updateBoard(index);
    }

    const resetGame = () => {
        gameBoard.resetBoard();
        displayController.resetDOMBoard();
    }
    
    const endGame = () => {

        gameBoard.resetBoard();
        displayController.resetDOMBoard();
    }
    const findWinner = () => {
        // gameBoard.gameBoardArray

    }

    return {startGame, resetGame, endGame}
})();

const player = () => {
    let type = "";
    let turn = true;
    let cpu = false;
    return {type, turn, cpu}
};





