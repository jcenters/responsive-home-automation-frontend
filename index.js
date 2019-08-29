// TODO:
// * Rejigger the data structures so setScene can turn accessories off
// * Figure out how to make checkScene() update regularly without screwing up the scene buttons

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
var sceneButtons = document.querySelectorAll(".scene");
var accessoryButtons = document.querySelectorAll(".accessory");

homeButtons.forEach(button => {
    button.addEventListener("click", function () {
        if (this.classList.contains("accessory") && this.classList.contains("on") && !this.classList.contains("thermostat")) {
            this.lastElementChild.innerText = "Off";
            this.classList.toggle("on");
            checkScene();
        } else if (this.classList.contains("accessory") && !this.classList.contains("thermostat")) {
            this.lastElementChild.innerText = "On";
            this.classList.toggle("on");
            checkScene();
        } else if (this.classList.contains("scene")) {
            this.classList.toggle("on");
            setScene(this.id);
        }
    });
});

function setScene(sceneID) {
    var sceneToBeSet = sceneAccessories[sceneID];
    if (document.getElementById(sceneID).classList.contains("on")) {

        sceneToBeSet.forEach(scene => {
            document.getElementById(scene).classList.add("on");
            document.getElementById(scene).lastElementChild.innerText = "On";
        });

    } else {

        sceneToBeSet.forEach(scene => {
            document.getElementById(scene).classList.remove("on");
            document.getElementById(scene).lastElementChild.innerText = "Off";
        });
    }
}

function checkScene() {

    //  This function compares html tags with the classes of "on" and "accessory" against the list of IDs for the given array and turns the scene button on and off depending on whether they match.

    var activeAccessories = [];

    accessoryButtons.forEach(button => {
        if (button.classList.contains("on")) {
            activeAccessories.push(button.id);
        }
    });

    activeAccessories.sort();

    sceneButtons.forEach(scene => {

        sceneAccessories[scene.id].sort();

        // This is my crappy workaround to compare the two arrays without writing a ton of extra code.

        activeAccessoriesString = activeAccessories.toString();
        sceneAccessoryString = sceneAccessories[scene.id].toString();

        if (activeAccessoriesString === sceneAccessoryString) {
            document.getElementById(scene.id).classList.add("on");
        } else {
            document.getElementById(scene.id).classList.remove("on");
        }
    });
}