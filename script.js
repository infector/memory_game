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
            this.tilesDivs = Array.from(tilesDivs);
            this.tileBack = $(".grid-item").css("background-color");
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

        }

        newGame() {

            let pickedPair = this.pickedPair;

            $(".grid-item").click(function () {

                $(this).css("background-image", $(this).data("image"));

                pickedPair.push($(this));

                if ($(pickedPair[0]).data("number") === $(this).data("number") && pickedPair.length === 2) {
                    pickedPair.pop();
                }

                if (pickedPair.length === 2 && $(pickedPair[0]).data("image") !== $(pickedPair[1]).data("image")) {

                    setTimeout(function () {

                        $(pickedPair[0]).removeAttr("style");
                        $(pickedPair[1]).removeAttr("style");
                        pickedPair = []

                    }, 250);

                } else if (pickedPair.length === 2 && $(pickedPair[0]).data("image") === $(pickedPair[1]).data("image")) {

                    $(pickedPair[0]).off("click");
                    $(pickedPair[1]).off("click");
                    pickedPair = [];
                }

            })

        }

        shuffleCards() {

            let randElem;
            let temp;

            for (let lastElemIndex = this.tilesDivs.length - 1; lastElemIndex >= 0; lastElemIndex--) {
                randElem = Math.floor(Math.random() * lastElemIndex);
                temp = this.tilesDivs[lastElemIndex];
                this.tilesDivs[lastElemIndex] = this.tilesDivs[randElem];
                this.tilesDivs[randElem] = temp;
                let imageConstruct = "url('" + this.images["img" + Math.floor(lastElemIndex / 2 + 1)] + "'), linear-gradient(-35deg, #444444, #000000)";

                $(this.tilesDivs[lastElemIndex]).data("image", imageConstruct);
                $(this.tilesDivs[lastElemIndex]).data("number", lastElemIndex);
            }


        }

    }

    let board = document.querySelector(".game-board");
    let tilesDivs = document.querySelectorAll(".grid-item");

    let game = new Game(board, tilesDivs);

    game.shuffleCards();
    game.newGame();

})