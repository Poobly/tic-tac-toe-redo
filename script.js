const Player = (cpu = false) => {
    let type = "";
    let turn = true;
    let isCpu = cpu;
    return {type, turn, cpu};
};

// the gameboard
const gameBoard = (() => {
    const gameBoardArray = new Array(9);

    const updateBoard = (index, player) => {
        gameBoardArray[index] = player.type;
    }

    const resetBoard = () => {
        for (element in gameBoardArray) {
            gameBoardArray[element] = undefined;
        }
    }
    
    return {gameBoardArray, updateBoard, resetBoard};
})();

// controls the webpage display
const displayController = (() => {
    const _gameBoardPieces = document.querySelectorAll(".board-piece");
    const _x = document.getElementById("x-button");
    const _o = document.getElementById("o-button");

    const updateBoard = (index, player) => {
        _gameBoardPieces[index].textContent = player.type;
    }

    const resetDOMBoard = () => {
        _gameBoardPieces.forEach(boardPiece => {
            boardPiece.textContent = "";
        });
    } 

    _x.addEventListener("click", (e) => {
        gameController.startGame(_x);
    });

    _o.addEventListener("click", (e) => {
        gameController.startGame(_o);
    });

    _gameBoardPieces.forEach(boardPiece => {
        boardPiece.addEventListener("click", (e) => {
            const index = boardPiece.id[boardPiece.id.length - 1] - 1;
            // check if index of current gameboard piece is empty
            // console.log(gameController.pauseGame);
            if (!gameController.pauseGame) {
                if (typeof gameBoard.gameBoardArray[index] === "undefined") {
                    // if board empty = start game, if not do a move
                    if (gameBoard.gameBoardArray.some(element => element === "X" || element === "O")) {
                        gameController.newTurn(index);
                    }
                    else {
                        gameController.startGame("X", index);
                    }
                }
            }
            
        })
    });

    
    return {updateBoard, resetDOMBoard};
})();

// controls the game
const gameController = (() => {
    let pauseGame = false;
    const player1 = Player();
    const cpu = Player(true);
    const _resetButton = document.getElementById("reset-button");

    // starts the game
    const startGame = (type, index) => {
        player1.type = type;

        if (player1.type === "X") cpu.type = "O";
        else cpu.type = "X";

        newTurn(index);
    }
    // resets the game
    const resetGame = () => {
        gameBoard.resetBoard();
        displayController.resetDOMBoard();
        gameController.pauseGame = false;
    }
    // reset button
    _resetButton.addEventListener("click", resetGame);
    // ends the game
    const endGame = () => {
        
        gameBoard.resetBoard();
        displayController.resetDOMBoard();
        

    }
    // new turn
    const newTurn = (index) => {
        gameBoard.updateBoard(index, player1);
        displayController.updateBoard(index, player1);
        checkWin(player1);
        if (!pauseGame) {
            cpuController.easy();
            checkWin(cpu);
        }
    }
    // checks win
    const checkWin = (player) => {
        const type = player.type;
        const board = gameBoard.gameBoardArray;
        if (board[0] === type && board[1] === type && board[2] === type ||
            board[3] === type && board[4] === type && board[5] === type ||
            board[6] === type && board[7] === type && board[8] === type) {
                
            console.log(`${player} has won`)
            gameController.pauseGame = true;
            console.log(gameController.pauseGame);
        }

    }

    return {startGame, resetGame, endGame, player1, cpu, newTurn, pauseGame};
})();

// controls the cpu
const cpuController = (() => {
    // easy mode
    const easy = () => {
        index = Math.floor(Math.random() * 9);
        if (typeof gameBoard.gameBoardArray[index] === "undefined") {
            displayController.updateBoard(index, gameController.cpu);
            gameBoard.updateBoard(index, gameController.cpu);
        }
        else easy();
    }

    return {easy};
})();