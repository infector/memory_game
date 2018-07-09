"use strict"

$(function () {

    class Game {

        constructor() {
            this.tilesDivs = [];
            this.pickedPair = [];
            this.difficultyValue;
            this.pairsClickedCounter = 0;
            this.pairsGuessedCounter = 0;
            this.selectable = true;
            this.difficultyValue = "";
            this.images = {
                img1: "img/PNG/2.png",
                img2: "img/PNG/3.png",
                img3: "img/PNG/6.png",
                img4: "img/PNG/7.png",
                img5: "img/PNG/9.png",
                img6: "img/PNG/16.png",
                img7: "img/PNG/17.png",
                img8: "img/PNG/18.png",
                img9: "img/PNG/4.png",
                img10: "img/PNG/5.png",
                img11: "img/PNG/8.png",
                img12: "img/PNG/10.png",
                img13: "img/PNG/11.png",
                img14: "img/PNG/12.png",
                img15: "img/PNG/13.png",
                img16: "img/PNG/14.png",
                img17: "img/PNG/15.png",
                img18: "img/PNG/19.png"
            };

        }

        newGame() {
            $(".game-board").empty();
            this.tilesDivs.length = 0;
            this.pairsClickedCounter = 0;
            this.pairsGuessedCounter = 0;
            this.pickedPair.length = 0;
            $(".counter").hide();
            $("select").show();
            $("select option:first-child").prop("selected", "selected");
            $(".game-board").prop("style", "");
            this.createBoard();
        }

        createBoard() {

            let that = this;

            $("select").off("change");
            $("select").change(function (e) {
                let element = '<div class="grid-item"></div>';
                let createdDiv;
                that.difficultyValue = parseInt($("select").val());
                let sideElemsCount = Math.sqrt(that.difficultyValue);
                let sideElemSize = 60 / sideElemsCount + "vmin";
                $(this).hide();
                $(".game-board").css("grid-template-columns", `repeat(${sideElemsCount}, ${sideElemSize})`);
                $(".game-board").css("grid-template-rows", `repeat(${sideElemsCount}, ${sideElemSize})`);
                $(".counter").show();
                $(".counter .moves").text(that.pairsClickedCounter);
                $(".counter .score").text(that.pairsGuessedCounter);

                for (let i = 0; i < that.difficultyValue; i++) {
                    $(".game-board").append(element);
                    createdDiv = $(".game-board").children(".grid-item").eq(i);
                    that.tilesDivs.push(createdDiv);
                }

                that.startGameMechanics();
                that.shuffleCards();
            });

        }

        startGameMechanics() {

            let that = this;

            $("#reset").off("click");
            $("#reset").click(function () {
                that.newGame();
            });

            $(".grid-item").click(function () {
                if (that.selectable === true) {
                    $(this).css("background-image", $(this).data("image"));

                    that.pickedPair.push($(this));

                    if ($(that.pickedPair[0]).data("number") === $(this).data("number") && that.pickedPair.length === 2) {
                        that.pickedPair.pop();
                    }
                }

                if (that.pickedPair.length === 2 && that.selectable == true && $(that.pickedPair[0]).data("image") !== $(that.pickedPair[1]).data("image")) {

                    that.selectable = false;

                    setTimeout(function () {

                        $(that.pickedPair[0]).removeAttr("style");
                        $(that.pickedPair[1]).removeAttr("style");
                        that.pickedPair.length = 0;
                        that.selectable = true;
                        that.pairsClickedCounter++;
                        $(".counter .moves").text(that.pairsClickedCounter);
                    }, 500);

                } else if (that.pickedPair.length === 2 && $(that.pickedPair[0]).data("image") === $(that.pickedPair[1]).data("image")) {

                    $(that.pickedPair[0]).off("click");
                    $(that.pickedPair[1]).off("click");
                    that.pickedPair.length = 0;
                    that.pairsGuessedCounter++;
                    $(".counter .score").text(that.pairsGuessedCounter);
                    that.pairsClickedCounter++;
                    $(".counter .moves").text(that.pairsClickedCounter);
                }

                if ((that.difficultyValue % 2 === 0 && that.pairsGuessedCounter * 2 === that.difficultyValue) ||
                    (that.difficultyValue % 2 !== 0 && that.pairsGuessedCounter * 2 === that.difficultyValue - 1)) {
                    // that.endGame();
                }
            });

        }

        shuffleCards() {
            let that = this;
            let randElem;
            let temp;

            for (let lastElemIndex = this.tilesDivs.length - 1; lastElemIndex >= 0; lastElemIndex--) {
                randElem = Math.floor(Math.random() * lastElemIndex);
                temp = this.tilesDivs[lastElemIndex]; // Fischer-Yates shuffle
                this.tilesDivs[lastElemIndex] = this.tilesDivs[randElem];
                this.tilesDivs[randElem] = temp;
                let imageConstruct = "url('" + this.images["img" + Math.floor(lastElemIndex / 2 + 1)] + "'), linear-gradient(-35deg, #444444, #000000)";

                $(this.tilesDivs[lastElemIndex]).data("image", imageConstruct);
                $(this.tilesDivs[lastElemIndex]).data("number", lastElemIndex);
            }


        }

        // endGame() {
        //     $("#reset").append("<div style='position: absolute; font-size: 3rem; color: red; left: 8vmin;'>CONGRATULATIONS!</div>");
        // }

    }

    let game = new Game();

    game.newGame();

})