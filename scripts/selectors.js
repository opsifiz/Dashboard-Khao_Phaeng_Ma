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

const season2color = {
    "summer": "#FF0000",
    "rainy": "#00FF00",
    "winter": "#0000FF",
};

const maps = {
    osm: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'),
    sat: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'),
};

// Animal Selector
let curAnimal = "all";

// Month Selector
let curMonth = "all";
const selectMonth = document.getElementById("monthSelect");

const monthChoices = [
    {label: "ทั้งหมด", value: "all"},
    {label: "ม.ค.", value: "1"},
    {label: "ก.พ.", value: "2"},
    {label: "มี.ค.", value: "3"},
    {label: "เม.ษ.", value: "4"},
    {label: "พ.ค.", value: "5"},
    {label: "มิ.ย.", value: "6"},
    {label: "ก.ค.", value: "7"},
    {label: "ส.ค.", value: "8"},
    {label: "ก.ย.", value: "9"},
    {label: "ต.ค", value: "10"},
    {label: "พ.ย.", value: "11"},
    {label: "ธ.ค.", value: "12"},
];

monthChoices.forEach((obj) => {
    const choice = document.createElement("option");
    choice.innerText = obj.label;
    choice.value = obj.value;
    
    selectMonth.appendChild(choice);
});

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

//Classify Selector
let curClassify = "month";
const selectClassify = document.getElementById("classify");
document.querySelector(".seasonSelect").style.display = "none";

const classifyChoices = [
    {label: "รายเดือน", value: "month"},
    {label: "รายฤดู", value: "season"},
];

classifyChoices.forEach((obj) => {
    const choice = document.createElement("option");
    choice.innerText = obj.label;
    choice.value = obj.value;
    
    selectClassify.appendChild(choice);
});

selectClassify.addEventListener("change", ()=>{
    curClassify = selectClassify.value;

    animalLayers.forEach(obj => {
        let iconUrl = "-";
        if(curClassify === "month") {
            iconUrl = `assets/${obj.type}_${name2hex[obj.month].slice(1)}.png`;
        }else if (curClassify === "season") {
            if (month2season[obj.month] === "summer") iconUrl = `assets/${obj.type}_FF0000.png`;
            else if (month2season[obj.month] === "rainy") iconUrl = `assets/${obj.type}_00FF00.png`;
            else if (month2season[obj.month] === "winter") iconUrl = `assets/${obj.type}_0000FF.png`;
        }
        if (obj.layer instanceof L.Marker) {
            const newIcon = L.icon({
                iconUrl: iconUrl,
                iconSize: [10, 10],
                iconAnchor: [10, 10],
                popupAnchor: [10, 10]
            });
            obj.layer.setIcon(newIcon);
        }
    });

    if(curClassify == "month"){
        document.getElementById('moreInfo').innerHTML = `
        <span style="color:#800000">■</span> มกราคม<br>
        <span style="color:#FF0000">■</span> กุมภาพันธ์<br>
        <span style="color:#FF7F00">■</span> มีนาคม<br>
        <span style="color:#FFC0CB">■</span> เมษายน<br>
        <span style="color:#FFFF00">■</span> พฤษภาคม<br>
        <span style="color:#00FF00">■</span> มิถุนายน<br>
        <span style="color:#0000FF">■</span> กรกฎาคม<br>
        <span style="color:#8B00FF">■</span> สิงหาคม<br>
        <span style="color:#4B0082">■</span> กันยายน<br>
        <span style="color:#A9A9A9">■</span> ตุลาคม<br>
        <span style="color:#4c4c4c">■</span> พฤศจิกายน<br>
        <span style="color:#000000">■</span> ธันวาคม<br>
        `;
        document.querySelector(".monthSelect").style.display = "block";
        document.querySelector(".seasonSelect").style.display = "none";
    }else if(curClassify == "season"){
        document.getElementById('moreInfo').innerHTML = `
        <span style="color:#FF0000">■</span> ฤดูร้อน<br>
        <span style="color:#00FF00">■</span> ฤดูฝน<br>
        <span style="color:#0000FF">■</span> ฤดูหนาว<br>
        `;
        document.querySelector(".monthSelect").style.display = "none";
        document.querySelector(".seasonSelect").style.display = "block";
    }
});

// Map Selector
let curMap = maps.osm; //Default Value
const selectMap = document.getElementById("mapSelect");

const mapChoices = [
    {label: "Street View", value: "osm"},
    {label: "Satellite View", value: "sat"},
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