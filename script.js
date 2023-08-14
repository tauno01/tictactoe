(function game() {

    const gameboardArr = [];
    let stopOpponent = 0;

    const Player = (marker) => {

        const playerIndex = (userMarker, cell) => {
            cell.textContent = userMarker;
            const cellValue = cell.getAttribute('value');
            gameboardArr[cellValue] = userMarker;
        }

        const opponentIndex = (opponentMarker, gameboardCells) => {
            stopOpponent++;
            let randomIndex;

            if(stopOpponent >= 5) return;
           
            do {
                randomIndex = Math.floor(Math.random() * 9);
            } while (gameboardArr[randomIndex] !== undefined);
            gameboardArr[randomIndex] = opponentMarker;
            gameboardCells[randomIndex].textContent = opponentMarker;
            console.log(gameboardArr, randomIndex);
            return stopOpponent;
        }

        return { marker, playerIndex, opponentIndex };
    }

    const user = Player('X');
    const opponent = Player('0');

    const gameboardCells = document.getElementsByClassName('marker-spot');
    for(const cell of gameboardCells) {
        cell.addEventListener('click', () => {
            if(cell.textContent !== '') return;
            user.playerIndex(user.marker, cell);
            opponent.opponentIndex(opponent.marker, gameboardCells);
        })
    }

    (function winGame() {
        const userWin = () => {};
        const opponentWin = () => {};
        return { userWin, opponentWin };
    })();
})();