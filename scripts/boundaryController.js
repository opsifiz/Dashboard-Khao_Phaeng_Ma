import {loadData} from "./loadData.js"; 

class BoundaryController{
    selected = new Set();
    borderLayers = {};
    
    type = null;
    data = null;

    multiSelect = null;
    
    selectedBox = null;
    dropdown = null;
    searchInput = null;
    optionList = null;
    
    selectAllBtn = null;
    clearAllBtn = null;
    
    renderOptions(filter = ""){
        if(!this.data){
            console.warn("Data not loading...");
            return;
        }
        this.optionList.innerHTML = "";
        this.data
        .filter(item => item.label.toLowerCase().includes(filter.toLowerCase()))
        .forEach(item => {
            const label = item.label;
            const value = item.value;

            const li = document.createElement("li");
            li.textContent = label;
            li.dataset.value = value;

            if (this.selected.has(value)) {
                li.style.fontWeight = "bold";
            }

            li.onclick = () => {
                this.selected.has(value) ? this.selected.delete(value) : this.selected.add(value);
                this.renderSelected();
                this.renderOptions(this.searchInput.value);
                renderBorders();
            };

            this.optionList.appendChild(li);
        });
    }
    
    renderSelected(){
        this.selectedBox.innerHTML = "";
        if (this.selected.size === 0) {
            this.selectedBox.innerHTML = `<span class="placeholder">เลือก ${this.title}</span>`;
            return;
        }
        this.selected.forEach(value => {
            const label = this.data.find(d => d.value === value).label;
            
            const tag = document.createElement("span");
            tag.className = "tag";
            tag.dataset.value = value;
            
            const text = document.createElement("span");
            text.innerText = label;
            
            const removeBtn = document.createElement("span");
            removeBtn.innerText = "X";
            removeBtn.style.cursor = "pointer";
            removeBtn.style.marginLeft = "4px";
            removeBtn.style.color = "red";
            
            removeBtn.onclick = (e) => {
                e.stopPropagation();
                const v = tag.dataset.value;
                this.selected.delete(v);
                this.renderSelected();
                this.renderOptions(this.searchInput.value);
                renderBorders();
            };
            
            tag.appendChild(text);
            tag.appendChild(removeBtn);
            this.selectedBox.appendChild(tag);
        });
        console.log(this.selected);
    }
    
    createRoot(){
        const wrapper = document.createElement("div");

        wrapper.innerHTML = `
            <p class="modal-sub-title">${this.title}</p>
            <div class="multi-select center" id="${this.type}MultiSelect">
                <div class="selected">
                    <span class="placeholder">เลือก ${this.title}</span>
                </div>
                <div class="dropdown hidden">
                    <input type="text" class="search" placeholder="Search...">
                    <div class="action-bar">
                        <button class="btn-select-all">All</button>
                        <button class="btn-clear-all">Clear</button>
                    </div>
                    <ul id="${this.type}OptionList" class="options"></ul>
                </div>
            </div>
        `;

        return wrapper;
    }

    constructor(type, title){
        this.type = type;
        this.title = title;

        this.root = this.createRoot();
        document.querySelector("section.boundary").appendChild(this.root);

        this.multiSelect = this.root.querySelector(".multi-select");
    }
    
    async init(){
        this.data = await loadData(`${this.type}s`);
        
        this.selectedBox = this.multiSelect.querySelector(".selected");
        this.dropdown = this.multiSelect.querySelector(".dropdown");
        this.searchInput = this.multiSelect.querySelector(".search");
        this.optionList = document.getElementById(`${this.type}OptionList`);
    
        this.selectAllBtn = this.multiSelect.querySelector(".btn-select-all");
        this.clearAllBtn = this.multiSelect.querySelector(".btn-clear-all");
            
        this.selectAllBtn.onclick = () => {
            this.data.forEach(item => this.selected.add(item.value));
            this.renderSelected();
            this.renderOptions(this.searchInput.value);
            renderBorders();
        };
            
        this.clearAllBtn.onclick = () => {
            this.selected.clear();
            this.renderSelected();
            this.renderOptions(this.searchInput.value);
            renderBorders();
        };

        this.selectedBox.onclick = () => {
            this.dropdown.classList.toggle("hidden");
            this.searchInput.focus();
        };
        
        this.searchInput.oninput = (e) => {
            this.renderOptions(e.target.value);
        };
        
        this.renderOptions();
    }
}

const levels = [
    {type: "province", title: "จังหวัด"},
    {type: "amphoe", title: "อำเภอ"},
    {type: "tambon", title: "ตำบล"},
    {type: "area", title: "แนวเขตป่าอนุรักษ์"},
];

let multiSelect = {};

levels.forEach(async item => {
    multiSelect[item.type] = new BoundaryController(item.type, item.title);
    await multiSelect[item.type].init();

    document.addEventListener("click", (e) => {
        if(!multiSelect[item.type].multiSelect.contains(e.target)){
            multiSelect[item.type].dropdown.classList.add("hidden");
        }
    });
});

const showBorderBtn = document.getElementById("showBorder");
const borderColorValue = document.getElementById("borderColor");

showBorderBtn.addEventListener("change", renderBorders);
borderColorValue.addEventListener("input", renderBorders);

showBorderBtn.addEventListener("change", ()=>{
    const value = showBorderBtn.checked;
    borderColorValue.disabled = !value;
});

function renderBorders(){
    levels.forEach((item) => {
        Object.values(multiSelect[item.type].borderLayers).forEach(layer => {
            if(map.hasLayer(layer)) map.removeLayer(layer);
        });

        multiSelect[item.type].borderLayers = {};
    });

    if(!showBorderBtn.checked) return;

    levels.forEach(async item => {
        for(const value of multiSelect[item.type].selected){

            const path = `border/${item.type}/${value}.geojson`;
            try{
                const res = await fetch(path);
                if(!res.ok){
                    console.error(`Failed to fetch ${path}`);
                    continue;
                }
                
                const geojson = await res.json();

                const layer = L.geoJSON(geojson, {
                    style: {
                        color: borderColorValue.value,
                        weight: 2,
                        fillOpacity: 0,
                    }
                }).addTo(map);

                multiSelect[item.type].borderLayers[value] = layer;
            }catch(err){
                console.error(err);
            }
        }
    });
}

const boundaryModal = document.getElementById("boundaryModal");
const boundaryModalBtn = document.getElementById("boundaryModalBtn");
const closeBtn = document.querySelector(".close");
boundaryModalBtn.onclick = function() {
    boundaryModal.style.display = "block";
}
closeBtn.onclick = function() {
    boundaryModal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == boundaryModal) {
        boundaryModal.style.display = "none";
    }
}