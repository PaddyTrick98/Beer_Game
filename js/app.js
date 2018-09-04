function Furry() {
    this.x = 0;
    this.y = 0;
    this.direction = "right";
    this.score = 0;
}

function Coin() {
    this.x = Math.floor(Math.random() * 10);
    this.y = Math.floor(Math.random() * 10);
}

function Game() {
    this.board = document.querySelectorAll("#board div");
    this.furry = new Furry();
    this.coin = new Coin();
    this.score = 0;
    this.index = function (x, y) {
        return x + (y * 10);
    };
    this.showFurry = function () {
        this.hideVisibleFurry();
        this.board[this.index(this.furry.x, this.furry.y)].classList.add("furry");

    }
    this.schowCoin = function () {
        this.board[this.index(this.coin.x, this.coin.y)].classList.add("coin");
    }
    this.moveFurry = function () {
        if (this.furry.direction === "right") {
            this.furry.x = this.furry.x + 1;
        } else if (this.furry.direction === "left") {
            this.furry.x = this.furry.x - 1;
        } else if (this.furry.direction === "up") {
            this.furry.y = this.furry.y - 1;
        } else if (this.furry.direction === "down") {
            this.furry.y = this.furry.y + 1;
        }
        this.checkCoinColision();
    };
    this.hideVisibleFurry = function () {
        var lastFurry = document.querySelector(".furry");
        if (lastFurry) {
            lastFurry.classList.remove("furry");
        }
    }
    this.startGame = function () {
        var self = this;
        this.idSetInterval = setInterval(function () {
            self.moveFurry();
            self.gameOver();
            self.showFurry();
            self.schowCoin();
        }, 250);
    }
    this.turnFurry = function (event) {
        switch (event.which) {
            case 37:
                this.furry.direction = "left";
                break;
            case 38:
                this.furry.direction = "up";
                break;
            case 39:
                this.furry.direction = "right";
                break;
            case 40:
                this.furry.direction = "down";
                break;
        }
    }
    this.checkCoinColision = function () {
        if (this.furry.x == this.coin.x && this.furry.y == this.coin.y) {
            document.querySelector(".coin").classList.remove("coin");
            this.score++;
            document.querySelector("#score strong").innerText = `${this.score}`;
            this.coin = new Coin();
            document.getElementById("burp_sound").play();
            this.schowCoin();
        }
    }
    this.gameOver = function () {
        if (this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9) {
            document.getElementById('browar_song').play();
            clearInterval(this.idSetInterval);
            this.hideVisibleFurry();
            document.querySelector("#over").classList.remove("invisible");
            document.getElementById("overScore").innerText = `${this.score}`;

        }
    }
}


var newGame = new Game();
var tryAgain = document.getElementById("newGame");

document.addEventListener("keydown", function (event) {
    newGame.turnFurry(event);
})

tryAgain.addEventListener('click', function () {
    
    document.querySelector("#over").classList.add("invisible");
    document.querySelector(".coin").classList.remove("coin");
    var newGame = new Game();
    document.addEventListener("keydown", function (event) {
        newGame.turnFurry(event);
        document.getElementById("browar_song").pause();
        document.getElementById("browar_song").sound.currentTime = 0;
        
    })
    newGame.startGame();

})

newGame.startGame();

