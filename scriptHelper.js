// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   
   let missionTarget = document.getElementById("missionTarget");
   missionTarget.innerHTML +=`
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name}</li>
                    <li>Diameter: ${diameter}</li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance}</li>
                    <li>Number of Moons: ${moons}</li>
                </ol>
                <img src="${imageUrl}">
   `
}

function validateInput(testInput) {
    if (testInput === "" || testInput === null || testInput === 0) {
        return "Empty";
    } else if (isNaN(testInput) === false) {
        return "Is a Number";
    } else {
        return "Not a Number";
    }   
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    let pilotStatus = document.getElementById("pilotStatus");
    let coPilotStatus = document.getElementById("copilotStatus");
    let fuelStatus = document.getElementById("fuelStatus");
    let cargoStatus = document.getElementById("cargoStatus");
    let faultyItems = document.getElementById("faultyItems");
    let launchStatus = document.getElementById("launchStatus");

    //check all fields are filled
    if (validateInput(pilot) === "Empty" || validateInput(copilot) === "Empty" || validateInput(fuelLevel) === "Empty" || validateInput(cargoLevel) === "Empty") {
        alert("All fields are required!");
    }
    //check that fuelLevel and cargoLevel are numbers 
    else if (validateInput(fuelLevel) === "Not a Number" || validateInput(cargoLevel) === "Not a Number") {
        alert("Please enter a valid number for fuel level and cargo mass.")
    }
    //and pilot and co-pilot are strings
    else if (validateInput(pilot) === "Is a Number" || validateInput(copilot) === "Is a Number") {
        alert("Please enter only alpha characters for pilot and copilot names.")
    }
    //update pilot/copilot status
    else {
        faultyItems.style.visibility = "visible";
        pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
        coPilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
    };
    // check fuel level and cargo level and update faulty items
    // fuelLevel must be > 10000 && cargoLevel must be < 10000
    if (fuelLevel < 10000 && cargoLevel <= 10000) {
        faultyItems.style.visibility = "visible";
        fuelStatus.innerHTML = "Fuel level too low for launch";
        cargoStatus.innerHTML = "Cargo mass low enough for launch";
        launchStatus.innerHTML = "Shuttle not ready for launch";
        launchStatus.style.color = "red";
    } else if (fuelLevel >= 10000 && cargoLevel > 10000) {
        faultyItems.style.visibility = "visible";
        fuelStatus.innerHTML = "Fuel level high enough for launch";
        cargoStatus.innerHTML = "Cargo mass too heavy for launch";
        launchStatus.innerHTML = "Shuttle not ready for launch";
        launchStatus.style.color = "red";
    } else if (fuelLevel < 10000 && cargoLevel > 10000) {
        faultyItems.style.visibility = "visible";
        fuelStatus.innerHTML = "Fuel level too low for launch";
        cargoStatus.innerHTML = "Cargo mass too heavy for launch";
        launchStatus.innerHTML = "Shuttle not ready for launch";
        launchStatus.style.color = "red";
    } else {
        faultyItems.style.visibility = "visible";
        fuelLevel.innerHTML = "Fuel level high enough for launch";
        cargoStatus.innerHTML = "Cargo mass low enough for launch";
        launchStatus.innerHTML = "Shuttle is ready for launch";
        launchStatus.style.color = "green";
    };
}


async function myFetch() {
    
    let planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
        if (response.status >= 400) {
            throw new Error("Bad response")
        } else {
            return response.json();
        }
    
});
    return planetsReturned;
}

function pickPlanet(planets) {
    let index = Math.floor((Math.random()*10)*planets.length);
    return planets[index];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
