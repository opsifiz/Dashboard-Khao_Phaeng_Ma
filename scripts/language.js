let curLang = "th";

export const languages = {
    "th":{
        animalLabel: "สัตว์ป่า:",
        animals: [
            {label: "ทั้งหมด", value: "all"},
            {label: "ช้างป่า", value: "ช้างป่า"},
            {label: "ลิงกัง", value: "ลิงกัง"},
            {label: "กระทิง", value: "กระทิง"},
            {label: "เลียงผา", value: "เลียงผา"},
            {label: "กวาง", value: "กวาง"},
            {label: "หมีควาย", value: "หมีควาย"},
        ],
        classifyLabel: "จำแนก:",
        classifys: [
            // {label: "รายเดือน", value: "month"},
            {label: "รายปี", value: "year"},
            {label: "รายฤดู", value: "season"},
        ],
        monthLabel: "เดือน:",
        months: [
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
        ],
        yearLabel: "ปี:",
        years: [
            {label: "ทั้งหมด", value: "all"},
            {label: "2566", value: 2566},
            {label: "2567", value: 2567},
            {label: "2568", value: 2568},
        ],
        seasonLabel: "ฤดู:",
        seasons: [
            {label: "ทั้งหมด", value: "all"},
            {label: "ฤดูร้อน", value: "summer"},
            {label: "ฤดูฝน", value: "rainy"},
            {label: "ฤดูหนาว", value: "winter"},
        ],
        mapLabel: "ประเภทแผนที่:",
        clusteringLabel: "จัดกลุ่ม:",
        runClustering: "ทำงาน",
        langLabel: "ภาษา:",
    },
    "en":{
        animalLabel: "Wild Animal:",
        animals: [
            {label: "All", value: "all"},
            {label: "Elephant", value: "ช้างป่า"},
            {label: "Macaque", value: "ลิงกัง"},
            {label: "Bull", value: "กระทิง"},
            {label: "Chamois", value: "เลียงผา"},
            {label: "Deer", value: "กวาง"},
            {label: "Asiatic Black Bear", value: "หมีควาย"},
        ],
        classifyLabel: "Classify:",
        classifys: [
            // {label: "Monthly", value: "month"},
            {label: "Yearly", value: "year"},
            {label: "Seasonly", value: "season"},
        ],
        monthLabel: "Month:",
        months: [
            {label: "All", value: "all"},
            {label: "Jan", value: "1"},
            {label: "Feb", value: "2"},
            {label: "March", value: "3"},
            {label: "April", value: "4"},
            {label: "May", value: "5"},
            {label: "June", value: "6"},
            {label: "July", value: "7"},
            {label: "Aug", value: "8"},
            {label: "Sept", value: "9"},
            {label: "Oct", value: "10"},
            {label: "Nov", value: "11"},
            {label: "Dec", value: "12"},
        ],
        yearLabel: "Year:",
        years: [
            {label: "All", value: "all"},
            {label: "2023", value: 2566},
            {label: "2024", value: 2567},
            {label: "2025", value: 2568},
        ],
        seasonLabel: "Season:",
        seasons: [
            {label: "All", value: "all"},
            {label: "Summer", value: "summer"},
            {label: "Rainy", value: "rainy"},
            {label: "Winter", value: "winter"},
        ],
        mapLabel: "Map Type:",
        clusteringLabel: "Cluster:",
        runClustering: "Run",
        langLabel: "Langauge:",
    }
}

export function setLang(value){
    curLang = value;
}

export function getLang(){
    return languages[curLang];
}