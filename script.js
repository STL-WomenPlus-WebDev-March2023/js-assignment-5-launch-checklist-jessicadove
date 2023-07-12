// Write your JavaScript code here!

window.addEventListener("load", function() {
    let form = document.querySelector("form");
    let list = document.getElementById("faultyItems");
    list.style.visibility = "hidden";

    let listedPlanets;
   // Set listedPlanetsResponse equal to the value returned by calling myFetch()
    let listedPlanetsResponse = myFetch(); 
    listedPlanetsResponse.then(function (result) {
       listedPlanets = result;
       console.log(listedPlanets);
    }).then(function () {
       console.log(listedPlanets);
       // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
       let selectedPlanet = pickPlanet(listedPlanets);
    
       addDestinationInfo(document, selectedPlanet.name, selectedPlanet.diameter, selectedPlanet.star, selectedPlanet.distance, selectedPlanet.moons, selectedPlanet.image);
   })

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        let pilotNameInput = document.querySelector("input[name=pilotName]");
        let pilot = pilotNameInput.value;
        let coPilotNameInput = document.querySelector("input[name=copilotName]");
        let copilot = coPilotNameInput.value;
        let fuelLevelInput = document.querySelector("input[name=fuelLevel]");
        let fuelLevel = fuelLevelInput.value;
        let cargoMassInput = document.querySelector("input[name=cargoMass]");
        let cargoLevel = cargoMassInput.value;
        let listInput = document.getElementById("faultyItems");
        let list = listInput.value;

        formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel);
    }); 
   
});