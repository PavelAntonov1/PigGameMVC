const diceElement = document.querySelector('.dice');

const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

class PlayerView {
  _data;
  _currentContainer;
  _scoreContainer;

  setStartingConditions(data) {
    this._data = data;

    this._pick('score', 0).textContent = 0;
    this._pick('score', 1).textContent = 0;

    diceElement.classList.add('hidden');
    this._pick('player', this._data.player).classList.add('player--active');
  }

  displayDice(dice) {
    diceElement.classList.remove('hidden');
    diceElement.src = `icons/dice-${dice}.png`;
  }

  displayCurrentScore(num) {
    this._pick('current', this._data.player).textContent = num + '';
  }

  displayScore(num) {
    this._pick('score', this._data.player).textContent = num + '';
  }

  displaySwitchPlayers() {
    this._pick('player', 0).classList.toggle('player--active');

    this._pick('player', 1).classList.toggle('player--active');
  }

  addHandlerRoll(handler) {
    btnRoll.addEventListener('click', handler);
  }

  addHandlerHold(handler) {
    btnHold.addEventListener('click', handler);
  }

  addHandlerNewGame(hadnler) {
    btnNew.addEventListener('click', hadnler);
  }

  displayGameOver() {
    diceElement.classList.add('hidden');

    this._pick('player', this._data.player).classList.remove('player--active');
    this._pick('player', this._data.player).classList.add('player--winner');
  }

  hideWinner() {
    this._pick('player', this._data.player).classList.remove('player--winner');
  }

  _pick(item, num) {
    let string;

    switch (item) {
      case 'score':
        string = `#score--${num}`;
        break;

      case 'current':
        string = `#current--${num}`;
        break;

      default:
        string = `.player--${num}`;
        break;
    }

    return document.querySelector(string);
  }
}

export default new PlayerView();
