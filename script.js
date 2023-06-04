const Player = (cpu = false) => {
    let type = "";
    let turn = true;
    let isCpu = cpu;
    return {type, turn, isCpu};
};

// the gameboard
const gameBoard = (() => {
    const gameBoardArray = new Array(9).fill(undefined);

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



// controls the game
const gameController = (() => {
    let pauseGame = false;
    const getPause = () => pauseGame;
    const player1 = Player();
    const cpu = Player(true);
    

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
        pauseGame = false;
    }

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
        console.log("before");
        // let cpu play if game isn't paused/board isn't full already
        if (!pauseGame && gameBoard.gameBoardArray.some(element => typeof element === "undefined")) {
            cpuController.easy();
            checkWin(cpu);
        }
        else if (!gameBoard.gameBoardArray.some(element => typeof element === "undefined")) {
            console.log("full")
        }
    }

    // checks win
    const checkWin = (player) => {
        const type = player.type;
        let board = gameBoard.gameBoardArray;
        board = [board.slice(0, 3), board.slice(3, 6), board.slice(6, 9)];
        
        // traversing rows and check row win
        for (let i = 0; i < 3; i++) {
            if (board[i][0] === type && board[i][1] === type && board[i][2] === type) {
                declareWinner();
            }
            
            // traversing columns and check column win
            for (let j = 0; j < 3; j++) {
                if (board[0][j] === type && board[1][j] === type && board[2][j] === type) {
                    declareWinner();
                }
            }

        // checks diagonal win
        if (board[0][0] === type && board[1][1] === type && board[2][2] === type || 
            board[2][0] === type && board[1][1] === type && board[0][2] === type) {
            declareWinner();
        }
    }
        function declareWinner() {
            pauseGame = true;
            displayController.displayModal(player);
        }
    }

    return {startGame, resetGame, endGame, player1, cpu, newTurn, getPause};
})();

// controls the webpage display
const displayController = (() => {
    const _gameBoardPieces = document.querySelectorAll(".board-piece");
    const _x = document.getElementById("x-button");
    const _o = document.getElementById("o-button");
    const _resetButton = document.getElementById("reset-button");

    const updateBoard = (index, player) => {
        _gameBoardPieces[index].textContent = player.type;
    }

    const resetDOMBoard = () => {
        _gameBoardPieces.forEach(boardPiece => {
            boardPiece.textContent = "";
        });
    } 

    const _boardGameEvent = (boardPiece) => {
        const index = boardPiece.id[boardPiece.id.length - 1] - 1;
        // check if index of current gameboard piece is empty
        if (!gameController.getPause()) {
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
    }

    const displayModal = (player) => {
        const modal = document.getElementById("game-modal");
        const newGameButton = document.getElementById("new-game-button");
        modal.style.display = "grid";
        // check if cpu or not to declare who won
        player.isCpu ? 
        modal.children[0].textContent = "You lost" :
        modal.children[0].textContent = "You won";

        _resetButton.removeEventListener("click", gameController.resetGame);
        _x.removeEventListener("click", _startGameEventPlayer);
        _o.removeEventListener("click", _startGameEventCpu)
        newGameButton.addEventListener("click", () => {
            _x.addEventListener("click", _startGameEventPlayer);
            _o.addEventListener("click", _startGameEventCpu);
            _resetButton.addEventListener("click", gameController.resetGame);
            modal.style.display = "none";
            gameController.resetGame();
        });
    }
    
    const _startGameEventCpu = () => {
        _x.addEventListener("click", _startGameEventPlayer);
        gameController.resetGame();
        gameController.cpu.type = "X"
        gameController.player1.type = "O";
        cpuController.easy();
        _o.removeEventListener("click", _startGameEventCpu);
    }

    const _startGameEventPlayer = () => {
        _o.addEventListener("click", _startGameEventCpu);
        gameController.resetGame();
        _x.removeEventListener("click", _startGameEventPlayer);
    }

    _x.addEventListener("click", _startGameEventPlayer);

    _o.addEventListener("click", _startGameEventCpu);

    // reset button
    _resetButton.addEventListener("click", gameController.resetGame);
    
    _gameBoardPieces.forEach(boardPiece => {
        boardPiece.addEventListener("click", _boardGameEvent.bind(this, boardPiece));
    });

    
    return {updateBoard, resetDOMBoard, displayModal};
})();

// controls the cpu
const cpuController = (() => {
    let difficulty 
    const play = () => {

    }

    // easy mode
    const easy = () => {
        index = Math.floor(Math.random() * 9);
        if (typeof gameBoard.gameBoardArray[index] === "undefined") {
            displayController.updateBoard(index, gameController.cpu);
            gameBoard.updateBoard(index, gameController.cpu);
        }
        else {

            easy();
        }
    }

    const medium = () => {

    }

    const hard = () => {

    }

    return {easy};
})();