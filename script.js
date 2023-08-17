(function game() {

    let stopOpponent = 0;
    let gameboardArr = [];
    let gameWon = false;
    
    const Player = (name, marker) => {

        const playerArr = [];

        const userIndex = (user, square) => {
            if(!gameWon) {
                const squareValue = square.getAttribute('value');
                user.playerArr[+squareValue] = +squareValue;
                Gamelogic.addToGameboard(user.marker, squareValue);
                Gamelogic.displayMarker(user, square);
            }
        };

        const opponentIndex = (opponent, gameboardSquare) => {
            if(!gameWon) {
                let randomNumber;
                if(stopOpponent < 4) {
                    do {
                        randomNumber = Math.floor(Math.random() * 9);
                    } while (gameboardArr[randomNumber] !== undefined);
                
                    opponent.playerArr[randomNumber] = randomNumber;
                    Gamelogic.addToGameboard(opponent.marker, randomNumber);
                    Gamelogic.displayMarker(opponent, gameboardSquare[randomNumber]);
                    stopOpponent++;
                } else return;
            }
        }

        return { opponentIndex, userIndex, name, marker, playerArr, stopOpponent };
    }

    const Gamelogic = (() => {
      
        const addToGameboard = (marker, squareValue) => {
            gameboardArr[squareValue] = marker;
        };

        

        const displayMarker = (player, square) => {
            square.textContent = player.marker;
            checkWinner(player.playerArr, player.name);
        };

        const checkWinner = (array, name) => {
            winningIndexes = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6]
            ]

            for(let i = 0; i < 8; i++) {
                if(winningIndexes[i].every(index => array.includes(index))) {
                    gameWon = true;
                    displayWinner(name);
                }
            }

            console.log(gameboardArr);

            if(!gameWon && !gameboardArr.includes(undefined) && gameboardArr.length === 9) {
                displayWinner('GameTie');
            }

        }

        const displayWinner = (name) => {
                const div = document.createElement('div');
                div.setAttribute('id', 'display-div');

                if(name !== 'GameTie') {
                    div.textContent = `${name} won the game`;
                } else div.textContent = 'Game ended in a tie';

                div.style.color = 'white';
                const containerDiv = document.getElementById('container');
                containerDiv.appendChild(div);
        };

        const resetGame = (user, opponent, gameboardSquare) => {
            stopOpponent = 0;
            opponent.playerArr = [];
            user.playerArr = [];
            gameboardArr = [];
            for(let i = 0; i <= 8; i++) {
                gameboardSquare[i].textContent = '';
            }
        }


        return { displayMarker,
                 addToGameboard,
                 checkWinner,
                 resetGame, 
                 gameWon, 
                 gameboardArr,
                };

    })();


    const startButton = document.getElementById('start-game');
    startButton.addEventListener('click', () => {
        const userName = document.getElementById('user-name');
        const span = document.getElementsByTagName('span')[0];
        if(userName.value === '') {
            userName.classList.add('input-error');
            span.classList.add('error-msg');
            return;
        } else {
            userName.classList.remove('input-error');
            span.classList.remove('error-msg');
        }

        startButton.disabled = true;
        startButton.classList.add('disabled');
        userName.disabled = true;
        const user = Player(userName.value, 'X');
        const opponent = Player('Opponent', '0');

        const gameboardSquare = document.getElementsByClassName('marker-spot');
        for(const square of gameboardSquare) {
            square.addEventListener('click', () => {
                if(square.textContent !== '') return;
                user.userIndex(user, square);
                opponent.opponentIndex(opponent, gameboardSquare);
            });
        };

        const restartGame = document.getElementById('restart-game');
        restartGame.addEventListener('click', () => {
            gameWon = false;
            Gamelogic.resetGame(user, opponent, gameboardSquare);
            const div = document.getElementById('display-div');
            div.remove();
        })
    });

})();