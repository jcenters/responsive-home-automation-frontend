// TODO:
// * Rejigger the data structures so setScene can turn accessories off
// * Figure out how to make checkScene() update regularly without screwing up the scene buttons

let sceneAccessories = {
    "good-morning": ["tv-room-switch", "office-who-lamp", "tv-room-couch-corner", "tv-room-tv-corner", "office-floor-lamp", "great-room-book-case"],
    "good-evening": ["bedroom-lamp", "great-room-book-case"],
    "leave-home": ["tv-room-switch"],
    "tv-time": ["tv-room-switch"],
    "good-afternoon": ["tv-room-switch"],
    "good-night": ["tv-room-switch"],
    "arrive-home": ["tv-room-switch", "office-who-lamp", "tv-room-couch-corner"],
}

const HOME_BUTTONS = document.querySelectorAll(".button");
const SCENE_BUTTONS = document.querySelectorAll(".scene");
const ACCESSORY_BUTTONS = document.querySelectorAll(".accessory");


HOME_BUTTONS.forEach(button => {
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
            setScene(this.id);
            checkScene();
        }
    });
});

function setScene(sceneID) {
    document.getElementById(sceneID).classList.toggle("on");
    let sceneToBeSet = sceneAccessories[sceneID];
    if (document.getElementById(sceneID).classList.contains("on")) {

        sceneToBeSet.forEach(accessory => {
            document.getElementById(accessory).classList.add("on");
            document.getElementById(accessory).lastElementChild.innerText = "On";
        });
    } else {

        sceneToBeSet.forEach(accessory => {
            document.getElementById(accessory).classList.remove("on");
            document.getElementById(accessory).lastElementChild.innerText = "Off";
        });
    }
}

function checkScene() {
    SCENE_BUTTONS.forEach(scene => { // Iterate through each scene
        let sceneAccessoryArray = sceneAccessories[scene.id]; //Create a list of associated accessories for each scene
        switch (sceneAccessoryArray.every((node) => document.getElementById([node]).classList.contains("on"))) {
            case true:
                document.getElementById(scene.id).classList.add("on");
                break;
            case false:
                document.getElementById(scene.id).classList.remove("on");
                break;
        }

    });
}