const feedback = document.getElementById("feedback");

const chamberList = [
    document.getElementById('chamber1'),
    document.getElementById('chamber2'),
    document.getElementById('chamber3'),
    document.getElementById('chamber4'),
    document.getElementById('chamber5'),
    document.getElementById('chamber6')
]


function getRandom(){
    var random = Math.floor(Math.random()*6)+1;
    return random;
}

function spinChamber() {
    document.getElementById
}

function markBullet(chamber){
    document.getElementById(chamberList[chamber-1]).style.backgroundColor = "red";
}

function reset(){
    for(var i=1; i<7; i++){
        document.getElementById(`chamber${i}`).style.backgroundColor = "black";
    }
}

const shoot = (selected) => {
    reset();
    var bullet = getRandom();
    if(selected===bullet){
        markBullet(bullet);
        feedback.style.color = "red";
        feedback.textContent = "You died :C";
    } else {
        markBullet(bullet);
        feedback.style.color = "green";
        feedback.textContent = "You're safe!";
    }
}


// function spinChamber(){
//     for(var i=0; i<5; i++){
//         for(var j=0; j<7; j++){
//             document.getElementById(`chamber${[j]}`).style.backgroundColor = "green";
//             document.getElementById(`chamber${[j-1]}`).style.backgroundColor = "black";
//         }
//     }
// }

// setInterval(spinChamber(), 1000);