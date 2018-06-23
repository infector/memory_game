"use strict"

$(function () {

    class Card {

        constructor(div, image) {
            this.div = div
            this.image = image;
        }
    }

    class Game {

        constructor(board, tilesDivs) {
            this.board = board;
            this.tilesDivs = tilesDivs;
            this.cards = [];
            this.pickedPair = [];
            this.pairsClickedCounter = 0;
            this.pairsGuessedCounter = 0;
            this.images = {
                img1: "img/PNG/2.png",
                img2: "img/PNG/3.png",
                img3: "img/PNG/6.png",
                img4: "img/PNG/7.png",
                img5: "img/PNG/9.png",
                img6: "img/PNG/16.png",
                img7: "img/PNG/17.png",
                img8: "img/PNG/18.png"
            };
            // this.assignImages = function(tilesDivs, tiles, images) {
            //     for (let i = 1; i < tilesDivs.length; i = i + 2) {

            //         tiles.push(new Tile(tilesDivs[i], images["img" + 1]));
            //         tiles.push(new Tile(tilesDivs[i], images["img" + 1]));

            //         // this.tiles[i].image = this.images["img" + i]
            //         // this.tiles[i + 1].image = this.images["img" + (i + 1)]

            //     }
            // }
        }

        assignImages() {

            for (let i = 2; i < this.tilesDivs.length + 2; i++) {
                this.cards.push(new Card(this.tilesDivs[i - 2], this.images["img" + Math.floor(i/2)]));
                // $(this.tilesDivs[i-2]).css("background-image", `url(${this.cards[0].image})`);
            }
        }

        newGame() {

        }

        shuffleCards() {

            let randElem;
            let temp;

            for (let lastElemIndex = this.cards.length - 1; lastElemIndex >= 0; lastElemIndex--) {
                randElem = Math.floor(Math.random() * lastElemIndex);
                temp = this.cards[lastElemIndex].image;
                this.cards[lastElemIndex].image = this.cards[randElem].image;
                this.cards[randElem].image = temp;

                $(this.cards[lastElemIndex].div).css("background-image", `url(${this.cards[lastElemIndex].image})`);
            }


        }

    }



    let board = document.querySelector(".game-board");
    let tilesDivs = document.querySelectorAll(".grid-item");

    let game = new Game(board, tilesDivs);

    game.assignImages();
    game.shuffleCards();


    console.log(game);





})