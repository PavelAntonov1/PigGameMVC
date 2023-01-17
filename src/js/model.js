export const state = {
  playing: true,

  scores: [0, 0],

  activePlayer: {
    player: 0,
    currentScore: 0,
  },
};

export const switchPlayers = function () {
  // changing the player
  state.activePlayer.player = state.activePlayer.player === 0 ? 1 : 0;
};
