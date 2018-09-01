/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

var scores, roundScore, activePlayer, gamePlaying, previosRollOne, previosRollTwo, finalScoreInput, userInput;

scores = [0, 0];
roundScore = 0;
activePlayer = 0;
gamePlaying = true;
previosRollOne = -1;
previosRollTwo = -1;
finalScoreInput = 5;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
        userInput = document.querySelector('.finalScore').value;
        document.querySelector('.finalScore').disabled = true;
        if (!userInput) {
            document.querySelector('.enterFinalScore').textContent = 'Player with the score of ' + finalScoreInput + ' wins the game';
        } else {
            document.querySelector('.enterFinalScore').textContent = 'Player with the score of ' + userInput + ' wins the game';
        }
        var diceOne = Math.floor((Math.random() * 6) + 1);
        var diceTwo = Math.floor((Math.random() * 6) + 1);

        var diceOneDOM = document.querySelector('.firstDice');
        var diceTwoDOM = document.querySelector('.secondDice');
        diceOneDOM.src = 'dice-' + diceOne + '.png';
        diceTwoDOM.src = 'dice-' + diceTwo + '.png';
        document.querySelector('.firstDice').style.display = 'block';
        document.querySelector('.secondDice').style.display = 'block';
        
        if ((previosRollOne === 6 || previosRollTwo === 6) && (diceOne === 6 || diceTwo === 6)) {
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = 0;
            nextPlayer();
        } else if (diceOne !== 1 && diceTwo !== 1) {
            roundScore += diceOne + diceTwo;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        }
        previosRollOne = diceOne;
        previosRollTwo = diceTwo;
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        previosRollOne = -1;
        previosRollTwo = -1;
        scores[activePlayer] += roundScore;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        if (userInput) {
            finalScoreInput = userInput;
        }
        
        if (scores[activePlayer] >= finalScoreInput) {
            document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
            document.querySelector('.firstDice').style.display = 'none';
            document.querySelector('.secondDice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
});

function nextPlayer() {
    roundScore = 0;
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    document.querySelector('#current-0').textContent = '0';
    document.querySelector('#current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.firstDice').style.display = 'none';
    document.querySelector('.secondDice').style.display = 'none';

}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    document.querySelector('.finalScore').disabled = false;
    document.querySelector('.finalScore').value = '';
    document.querySelector('.enterFinalScore').textContent = 'Enter a Final Score!';
    // Change the scores to 0
    document.querySelector('#score-0').textContent = '0';
    document.querySelector('#current-0').textContent = '0';
    document.querySelector('#score-1').textContent = '0';
    document.querySelector('#current-1').textContent = '0';

    // Initialize all variables
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    previosRollOne = -1;
    previosRollTwo = -1;
    finalScoreInput = 5;

    document.querySelector('.firstDice').style.display = 'none';
    document.querySelector('.secondDice').style.display = 'none';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
}