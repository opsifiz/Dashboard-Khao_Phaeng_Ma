let curLang = "th";

export const languages = {
    "th":{
        monthLabels: "เดือน:",
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
    },
    "en":{
        monthLabels: "Month:",
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

    }
}

export function translate(word){

}

export function setLang(value){
    curLang = value;
}

export function getLang(){
    return languages[curLang];
}