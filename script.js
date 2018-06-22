$(function () {

    class Tile {

        constructor() {
            
        }
    }

    class Game {

        constructor() {
            this.board = document.querySelector(".game-board");
            this.tiles = $(this.board).children();
            this.images = {
                img1: "img/2.png",
                img2: "img/3.png",
                img3: "img/6.png",
                img4: "img/7.png",
                img5: "img/9.png",
                img6: "img/16.png",
                img7: "img/17.png",
                img8: "img/18.png"
            }
        }

        assignImages() {

            for (let i = 0; i < this.tiles.length; i++) {
                
                if (a % 2 == 0 && a > 0) {
                    
                }

                $(this.tiles[i]).image = this.images[Math.floor(i/2)]
            }

        }

        resetGame() {

        }

        shuffleCards() {

        }

    }




    let game = new Game();








})