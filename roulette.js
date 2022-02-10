const feedback = document.getElementById("feedback");
const wincountDisplay = document.getElementById('wincountDisplay');
const totalWinsDisplay = document.getElementById('totalWinsDisplay');
const scrollingInfo = document.getElementById("scrollingInfo");

const chamberList = [
    document.getElementById('chamber1'),
    document.getElementById('chamber2'),
    document.getElementById('chamber3'),
    document.getElementById('chamber4'),
    document.getElementById('chamber5'),
    document.getElementById('chamber6')
];

const spinFirst = [
    "Please spin the chamber again first :)",
    "You have to spin the chamber first",
    "omg please spin the chamber",
    "ok actually stop",
    "are you trying to make someone mad? does this make your day better?",
    "this is your sixth sinfulWrongdoing at this point. what are you trying to accompolish",
    "is this something you do for fun or something? does this make you happy? SPIN THE CHAMBER",
    "nah do it again and see what happens",
    "im about to give up seriously im so done",
    "do it again and you die regardless",
    "im serious!",
    "DO IT AGAIN I DARE YOU I DARE YOU TO DO IT AGAIN"
];

// different strings of info the spinning text is set to
let infoBlocks = [
    `Fun Fact: Russian roulette originates from Tsarist Russia`,            // source: https://crazyfacts.com/the-facts-behind-russian-roulette/
    `Fun Fact: The code this was written in is 188 lines long`,            // please dont forget to change this thing before i submit thanks
    `Always spin the revolver after each try, or the program gets mad...`,
    `Fun Fact: Given a six shot revolver, the probability of losing is 1 in 6, or about 16.7%`,
    `Do not play russian roulette in real life`,
    `My github is <a href="https://github.com/ruasidev">https://github.com/ruasidev</a> ;)` 
];


var wins = 0;                                           // the wins the user has in the current session
var totalwins = localStorage.getItem("totalWins");      // the total wins the user has {stored in localStorage}
var games = localStorage.getItem("games");              // the number of games the user has played {stored in localStorage}

var sinfulWrongdoings = 0;                              // "sinfulWrongdoings" refers to the amount of times the user tried to play without spinning the chamber first
var spun = false;                                       // determines whether or not the chamber had been spun yet

// makes sure the games and total wins dont display null when there is no localStorage variable for it
if(games === null){
    games = 0;
}
if(totalwins === null){
    totalwins = 0;
}


feedback.textContent = "Spin the revolver with the 'spin the chamber' button";          // tells the user to spin the chamber
wincountDisplay.textContent = `Wins this session = ${wins}`;                            // shows how many wins the user has in the session
totalWinsDisplay.textContent = `Total wins over ${games} games = ${totalwins}`;         // shows how many games the user has played, and how many total wins they have

// get a random number 1 through 6
function getRandom(){
    var random = Math.floor(Math.random()*6)+1;
    return random;
}

// shows where the bullet is
function markBullet(chamber){
    chamberList[chamber-1].style.backgroundColor = "red";
}

// hides all of the chambers by changing them to black
function reset(){
    for(var i=1; i<7; i++){
        document.getElementById(`chamber${i}`).style.backgroundColor = "black";
    }
}


// changes the spinning text at the bottom every time it reaches the end of the animation
var revolutions = 0;
var chocomint = 0;
const changeSpinningText = () => {
    var scopeTime = 0;
    if(chocomint === 0){                 // to set the text right away instead of waiting the time first
        scopeTime === 0;
        chocomint++;
    } else {
        scopeTime = 15000;
    }
    setTimeout(function() {
        scrollingInfo.innerHTML = infoBlocks[revolutions];
        revolutions++;
        if (revolutions < infoBlocks.length) {changeSpinningText()} else {revolutions = 0; changeSpinningText()}    // resets the string loop when it reaches the end of the infoblock
    }, scopeTime)
}
changeSpinningText();


const shoot = (selected) => {       // gets the chamber that the user clicked from the onclick event in the HTML
    if(spun===true){                // run if the chamber has been spun already
        document.getElementById('background').style.backgroundColor = "inherit";
        sinfulWrongdoings = 0;
            reset();
        var bullet = getRandom();
        if(selected===bullet){      // the user "dies" when they select the chamber with the bullet in it
            markBullet(bullet);
            feedback.style.color = "red";
            feedback.textContent = "You died :C";
            games++;
            spun = false;
            displayRecord();
        } else {
            markBullet(bullet);
            feedback.style.color = "green";
            feedback.textContent = "You're safe!";
            spun = false;
            totalwins++;
            wins++;
            games++;
            displayRecord();
        }
    } else {                        // inform the user to spin the chamber before playing, and adds to sinfulWrongdoings
        sinfulWrongdoings++;
        reset();
        feedback.textContent = spinFirst[sinfulWrongdoings-1];          // this is what displays the comments based on how many sinfulWrongdoings the user has
        if(sinfulWrongdoings >= 13){                                    // when the user has 13 sinfulWrongdoings, change everything to red and make all the chambers bullets
            document.getElementById('background').style.backgroundColor = "maroon";
            document.getElementById('spinButton').style.backgroundColor = "red";
            document.getElementById('clearButton').style.backgroundColor = "red";
            feedback.style.color = "red";
            feedback.textContent = "YOU DIED.";
            games++;
            for(var i = 0; i < chamberList.length; i++){
                chamberList[i].style.backgroundColor = "red";
            }
        }
    }   
}

// updated the game records stored in localStorage
function displayRecord(){
    localStorage.setItem("games", games);
    localStorage.setItem("totalWins", totalwins);

    totalWinsDisplay.textContent = `Total wins over ${games} games = ${totalwins}`;
    wincountDisplay.textContent = `Wins this session = ${wins}`;
}

var p = 1;
// says the chamber is spinning and makes sure the background and colours are normal
function spinChamber() {   
    document.getElementById('background').style.backgroundColor = "inherit";
    document.getElementById('spinButton').style.backgroundColor = "#4285f4";
    document.getElementById('clearButton').style.backgroundColor = "white";
    feedback.style.color = "black";
    feedback.textContent = "Spinning...";
    spinChamber2();
    spun = true;
}

// {cosmetic} randomly flashes chambers red to show "spinning" of the chamber (does not actually determine the position of the bullet)
const spinChamber2 = () => {
    setTimeout(function() {
        reset();
        let random = getRandom();
        document.getElementById(`chamber${random}`).style.backgroundColor = "red";
        p++;
        if (p < 20) {spinChamber2()} else {
            reset();
            feedback.style.color = "black";
            feedback.textContent = "Take your pick...";
            p = 1;
        }
    }, 50)
}

// clears the localStorage and resets the win count
const clearStorage = () => {
    reset();
    feedback.textContent = "Cleared game history! Play again";
    localStorage.clear();
    wins = 0;
    totalwins = 0;
    games = 0;
    totalWinsDisplay.textContent = `Total wins over 0 games = 0`;
    wincountDisplay.textContent = `Wins this session = ${wins}`;
}