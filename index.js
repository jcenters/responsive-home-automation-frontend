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
            // checkScene();
            betterCheckScene();
        } else if (this.classList.contains("accessory") && !this.classList.contains("thermostat")) {
            this.lastElementChild.innerText = "On";
            this.classList.toggle("on");
            // checkScene();
            betterCheckScene();
        } else if (this.classList.contains("scene")) {
            // this.classList.toggle("on");
            setScene(this.id);
            betterCheckScene();
        }
    });
});


// This is what you want to do when you click an accessory button
// Turn that accessory on or off depending on its state
// Check all the scenes to see if their associated accessories are on
// If they are on, turn the scene on. If not, turn the scene off.

// This is what you want to do when you click a scene button
// Turn on the accessories tied to that scene
// Check all the scenes to see if their associated accessories are on
// If they are on, turn the scene on. If not, turn the scene off.

function setScene(sceneID) {
    //The problem is here. You're setting accessories based on the state of the scene button, when instead it should be 
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

    //  This function compares html tags with the classes of "on" and "accessory" against the list of IDs for the given array and turns the scene button on and off depending on whether they match.

    // Get an array of accessories labeled on

    let activeAccessories = [];

    ACCESSORY_BUTTONS.forEach(accessory => {
        if (accessory.classList.contains("on")) {
            activeAccessories.push(accessory.id);
        }
    });

    activeAccessories.sort();
    let activeAccessoriesString = activeAccessories.toString();
    // console.log(`activeAccessoriesString equals ${activeAccessoriesString}`);

    SCENE_BUTTONS.forEach(scene => {
        let sceneAccessoryList = sceneAccessories[scene.id];

        sceneAccessoryList.sort();

        // This is my crappy workaround to compare the two arrays without writing a ton of extra code.

        let sceneAccessoryString = sceneAccessoryList.toString();
        console.log(`sceneAccessoryString for ${scene} equals ${sceneAccessoryString}`);

        if (activeAccessoriesString === sceneAccessoryString) {
            document.getElementById(scene.id).classList.add("on");
        } else {
            document.getElementById(scene.id).classList.remove("on");
        }
    });
}

function betterCheckScene() {
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