const month2season = [
    "-",
    "winter",
    "winter",
    "summer",
    "summer",
    "summer",
    "summer",
    "rainy",
    "rainy",
    "rainy",
    "rainy",
    "winter",
    "winter",
];
        
let curSeason = "all"; //Default Value

const selectSeason = document.getElementById("seasonSelect");

selectSeason.addEventListener("change", () => {
    curSeason = selectSeason.value;
    // console.log(value);
    animalLayers.forEach(obj => {
        if((curAnimal === 'all' || obj.type == curAnimal) && (curSeason === 'all' || month2season[obj.month] == curSeason)){
            if(!map.hasLayer(obj.layer)) obj.layer.addTo(map);
        } else {
            if(map.hasLayer(obj.layer)) map.removeLayer(obj.layer);
        }
    });
});