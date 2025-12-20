const name2hex = {
    "ช้างป่า":  "#FF0000",
    "กระทิง":  "#0000FF",
    "ลิงกัง":   "#00FF00",
    "เลียงผา": "#FF7F00",
    "กวาง":   "#4B0082",
    "หมีควาย": "#8B00FF",
    "1":  "#800000",
    "2":  "#FF0000",
    "3":  "#FF7F00",
    "4":  "#FFC0CB",
    "5":  "#FFFF00",
    "6":  "#00FF00",
    "7":  "#0000FF",
    "8":  "#8B00FF",
    "9":  "#4B0082",
    "10": "#A9A9A9",
    "11": "#4c4c4c",
    "12": "#000000"
}

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

const maps = {
    osm: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'),
    sat: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'),
};

// Animal Selector
let curAnimal = "all";

// Season Selector
let curSeason = "all"; //Default Value
const selectSeason = document.getElementById("seasonSelect");

const seasonChoices = [
    {label: "ทั้งหมด", value: "all"},
    {label: "ฤดูร้อน", value: "summer"},
    {label: "ฤดูฝน", value: "rainy"},
    {label: "ฤดูหนาว", value: "winter"},
];

seasonChoices.forEach((obj) => {
    const choice = document.createElement("option");
    choice.innerText = obj.label;
    choice.value = obj.value;
    
    selectSeason.appendChild(choice);
});

selectSeason.addEventListener("change", () => {
    curSeason = selectSeason.value;
    animalLayers.forEach(obj => {
        if((curAnimal === 'all' || obj.type == curAnimal) && (curSeason === 'all' || month2season[obj.month] == curSeason)){
            if(!map.hasLayer(obj.layer)) obj.layer.addTo(map);
        } else {
            if(map.hasLayer(obj.layer)) map.removeLayer(obj.layer);
        }
    });
});

// Map Selector
let curMap = maps.osm; //Default Value
const selectMap = document.getElementById("mapSelect");

const mapChoices = [
    {label: "OpenStreetMap", value: "osm"},
    {label: "Satellite", value: "sat"},
];

mapChoices.forEach((obj) => {
    const choice = document.createElement("option");
    choice.innerText = obj.label;
    choice.value = obj.value;
    
    selectMap.appendChild(choice);
});


selectMap.addEventListener("change", ()=>{
    map.removeLayer(curMap);

    curMap = maps[selectMap.value];
    map.addLayer(curMap);
});