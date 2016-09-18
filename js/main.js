const HanoiView = require("./hanoi-view");
const HanoiGame = require("../../solution/game");

$( () => {
  const rootEl = $('.hanoi');
  const game = new HanoiGame();
  let view = new HanoiView(game, rootEl);

  view.render();
  view.bindEvents();
});
