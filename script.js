const gameBoard = (() => {
    let gameBoardArray = [ 
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]];
    return {gameBoardArray};
})();


const displayController = (() => {
    const gameBoardContainer = document.getElementById("game-board-container");
    updateBoard = () => {
        gameBoard.gameBoardArray
    }
    return {gameBoardContainer, updateBoard};
})();

const player = () => {
    type = "";
    
};