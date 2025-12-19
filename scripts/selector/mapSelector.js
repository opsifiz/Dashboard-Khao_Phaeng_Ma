const maps = {
    osm: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'),
    sat: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'),
};

let curMap = maps.osm; //Default Value

const selectMap = document.getElementById("mapSelect");

const osmChoice = document.createElement("option");
osmChoice.innerText = "OpenStreetMap";
osmChoice.value = "osm";

const satChoice = document.createElement("option");
satChoice.innerText = "Satellite";
satChoice.value = "sat";

selectMap.appendChild(osmChoice);
selectMap.appendChild(satChoice);

selectMap.addEventListener("change", ()=>{
    map.removeLayer(curMap);

    curMap = maps[selectMap.value];
    map.addLayer(curMap);
});