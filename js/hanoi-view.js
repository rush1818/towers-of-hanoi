class HanoiView {
  constructor(game, $el){
    this.game = game;
    this.$el = $el;
  }

  setupTowers() {
  this.game.towers.forEach( (tower, id1) => {
    let $tower = $("<ul></ul>");
    $tower.addClass("tower");
    $tower.addClass("group");
    $tower.attr({"pos":id1});
    this.$el.append($tower);
    tower.forEach( (el) => {
      let $disc = $("<li></li>");
      $disc.addClass('disc');
      $disc.addClass(`d${el}`);
      $disc.text(`${el}`);
      // $disc.attr({"pos":id1, "val": el});
      $tower.append($disc);
  });});
  }

  render(){
    this.$el.children().remove();
    this.setupTowers();
  }

  bindEvents(){
    let $tower = $(".tower");
    $tower.on("click", event1 => {
      const startTower = event1.currentTarget;
      const $startTower = $(startTower);
      $startTower.addClass('thisTower');
      $tower.on("click", event2 => {
        const endTower = event2.currentTarget;
        const $endTower = $(endTower);
        this.makeMove($startTower, $endTower);
      });
    });
  }

  makeMove($startTower, $endTower){
    let start = parseInt($startTower.attr("pos"));
    let end = parseInt($endTower.attr("pos"));
    if (!this.game.move(start, end)) {
      alert("invalid move!");
    }
    this.render();
    this.bindEvents();

    if (this.game.isWon()) {

      $('body').append("<h1>Niiiiiice job! Game over.</h1>");
    }
  }
}

module.exports = HanoiView;
