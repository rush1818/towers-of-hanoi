/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const HanoiView = __webpack_require__(2);
	const HanoiGame = __webpack_require__(1);

	$( () => {
	  const rootEl = $('.hanoi');
	  const game = new HanoiGame();
	  let view = new HanoiView(game, rootEl);

	  view.render();
	  view.bindEvents();
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	class Game {
	  constructor() {
	    this.towers = [[3, 2, 1], [], []];
	  }

	  isValidMove(startTowerIdx, endTowerIdx) {
	      const startTower = this.towers[startTowerIdx];
	      const endTower = this.towers[endTowerIdx];

	      if (startTower.length === 0) {
	        return false;
	      } else if (endTower.length == 0) {
	        return true;
	      } else {
	        const topStartDisc = startTower[startTower.length - 1];
	        const topEndDisc = endTower[endTower.length - 1];
	        return topStartDisc < topEndDisc;
	      }
	  }

	  isWon() {
	      // move all the discs to the last or second tower
	      return (this.towers[2].length == 3) || (this.towers[1].length == 3);
	  }

	  move(startTowerIdx, endTowerIdx) {
	      if (this.isValidMove(startTowerIdx, endTowerIdx)) {
	        this.towers[endTowerIdx].push(this.towers[startTowerIdx].pop());
	        return true;
	      } else {
	        return false;
	      }
	  }

	  print() {
	      console.log(JSON.stringify(this.towers));
	  }

	  promptMove(reader, callback) {
	      this.print();
	      reader.question("Enter a starting tower: ", start => {
	        const startTowerIdx = parseInt(start);
	        reader.question("Enter an ending tower: ", end => {
	          const endTowerIdx = parseInt(end);
	          callback(startTowerIdx, endTowerIdx)
	        });
	      });
	  }

	  run(reader, gameCompletionCallback) {
	      this.promptMove(reader, (startTowerIdx, endTowerIdx) => {
	        if (!this.move(startTowerIdx, endTowerIdx)) {
	          console.log("Invalid move!");
	        }

	        if (!this.isWon()) {
	          // Continue to play!
	          this.run(reader, gameCompletionCallback);
	        } else {
	          this.print();
	          console.log("You win!");
	          gameCompletionCallback();
	        }
	      });
	  }
	}

	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports) {

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


/***/ }
/******/ ]);