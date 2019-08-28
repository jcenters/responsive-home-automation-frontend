// TODO: Rejigger the data structures so setScene can turn accessories off

var sceneAccessories = {
    "good-morning": ["tv-room-switch", "office-who-lamp", "tv-room-couch-corner", "tv-room-tv-corner", "office-floor-lamp", "great-room-book-case"],
    "good-evening": [],
    "leave-home": [],
    "tv-time": [],
    "good-afternoon": [],
    "good-night": [],
    "arrive-home": ["tv-room-switch", "office-who-lamp", "tv-room-couch-corner"],
}

var homeButtons = document.querySelectorAll(".button");

var goodMorningAccessories = ["tv-room-switch", "office-who-lamp", "tv-room-couch-corner", "tv-room-tv-corner", "office-floor-lamp", "great-room-book-case"];

var goodEveningAccessories = [];

var tvTimeAccessories = [];


// Good Night is the opposite of Good Morning, so we use the same array there


for (i = 0; i < homeButtons.length; i++) {
    homeButtons[i].addEventListener("click", function () {
        if (this.classList.contains("accessory") && this.classList.contains("on") && !this.classList.contains("thermostat")) {
            this.lastElementChild.innerText = "Off";
            this.classList.toggle("on");
            for (i = 0; i < document.querySelectorAll(".scene").length; i++) {
                checkScene(document.querySelectorAll(".scene")[i].id);
                console.log(i);
            }
        } else if (this.classList.contains("accessory") && !this.classList.contains("thermostat")) {
            this.lastElementChild.innerText = "On";
            this.classList.toggle("on");
            for (i = 0; i < document.querySelectorAll(".scene").length; i++) {
                checkScene(document.querySelectorAll(".scene")[i].id);
                console.log(i);
            }
        } else if (this.classList.contains("scene")) {
            this.classList.toggle("on");
            setScene(this.id);
            for (i = 0; i < document.querySelectorAll(".scene").length; i++) {
                checkScene(document.querySelectorAll(".scene")[i].id);
                console.log(i);
            }
        }


    });
}

function checkScene(id) {

    //  This function compares html tags with the classes of "on" and "accessory" against the list of IDs for the given array and turns the scene button on and off depending on whether they match.

    console.log("checkScene says " + id);

    var allAccessories = document.querySelectorAll(".accessory");
    var activeAccessories = [];

    for (i = 0; i < allAccessories.length; i++) {
        if (allAccessories[i].classList.contains("on")) {
            activeAccessories.push(allAccessories[i].id);
        }
    }

    sceneAccessories[id].sort();
    activeAccessories.sort();

    // This is my crappy workaround to compare the two arrays without writing a ton of extra code.

    activeAccessoriesString = activeAccessories.toString();
    sceneAccessoryString = sceneAccessories[id].toString();

    if (activeAccessoriesString === sceneAccessoryString) {
        document.getElementById(id).classList.add("on");
    } else {
        document.getElementById(id).classList.remove("on");
    }

}

function SceneAccessoryIsOn(sceneID) {
    // I made this function for my old checkScene function that used the every method. I probably don't need it, but it's here just in case.
    return document.getElementById(sceneID).classList.contains("on");
}

function setScene(sceneID) {
    if (document.getElementById(sceneID).classList.contains("on")) {
        // document.getElementById(sceneID).classList.remove("on");
        for (i = 0; i < sceneAccessories[sceneID].length; i++) {
            document.getElementById(sceneAccessories[sceneID][i]).classList.add("on");
            document.getElementById(sceneAccessories[sceneID][i]).lastElementChild.innerText = "On";
        }

    } else {
        // document.getElementById("good-morning").classList.add("on");

        for (i = 0; i < sceneAccessories[sceneID].length; i++) {
            document.getElementById(sceneAccessories[sceneID][i]).classList.remove("on");
            document.getElementById(sceneAccessories[sceneID][i]).lastElementChild.innerText = "Off";
        }
    }
}