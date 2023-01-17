import * as model from './model.js';
import playerView from './views/playerView.js';

const controlRoll = function () {
  if (model.state.playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Displaying the dice
    playerView.displayDice(dice);

    // 3. Checking for rolled 1
    if (dice !== 1) {
      // Adding dice to the current score
      model.state.activePlayer.currentScore += dice;
      playerView.displayCurrentScore(model.state.activePlayer.currentScore);
    } else {
      // Setting currentScor to 0
      playerView.displayCurrentScore(0);
      model.state.activePlayer.currentScore = 0;

      // Switching the players
      model.switchPlayers();
      playerView.displaySwitchPlayers();
    }
  }
};

const controlHold = function () {
  if (model.state.playing) {
    // Adding to the scores array
    model.state.scores[model.state.activePlayer.player] +=
      model.state.activePlayer.currentScore;

    // Setting currentScor to 0
    playerView.displayCurrentScore(0);
    model.state.activePlayer.currentScore = 0;

    // Displaying the score
    playerView.displayScore(
      model.state.scores[model.state.activePlayer.player]
    );

    // Checking if there is a winner
    if (model.state.scores[model.state.activePlayer.player] >= 20) {
      model.state.playing = false;
      playerView.displayGameOver();
    } else {
      model.switchPlayers();
      playerView.displaySwitchPlayers();
    }
  }
};

const controlNewGame = function () {
  if (!model.state.playing) {
    playerView.hideWinner();

    model.state.activePlayer.player = 0;

    playerView.setStartingConditions(model.state.activePlayer);

    model.state.playing = true;

    model.state.scores = [0, 0];
  }
};

const init = function () {
  playerView.setStartingConditions(model.state.activePlayer);
  playerView.addHandlerRoll(controlRoll);
  playerView.addHandlerHold(controlHold);
  playerView.addHandlerNewGame(controlNewGame);
};

init();
